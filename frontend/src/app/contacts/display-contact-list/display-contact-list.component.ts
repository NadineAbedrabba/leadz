import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddEditComponent } from '../contact-add-edit/contact-add-edit.component';
import { ContactService } from '../../services/contact.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { ContactViewDialogComponent } from '../contact-view-dialog/contact-view-dialog.component';

@Component({
  selector: 'display-contact-list',
  templateUrl: './display-contact-list.component.html',
  styleUrls: ['./display-contact-list.component.scss']
})
export class DisplayContactListComponent {
  displayedColumns: string[] = [
    'id',
    'prenom',
    'nom',
    'email',
    'identifiant',
    'type',
    'num',
    'type_c',
    'adresse',
    'pays',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentStatusFilter: string = '';
  currentDateFilter: string = '';

  constructor(
    private _dialog: MatDialog,
    private _ContactService: ContactService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getContactList();
  }

  openAddEditContactForm() {
    const dialogRef = this._dialog.open(ContactAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContactList();
        }
      },
    });
  }

  getContactList() {
    this._ContactService.getContactList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyDateFilter(filterBy: string) {
    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date = today;

    if (filterBy === 'all') {
      startDate = null;
    } else if (filterBy === 'today') {
      startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
    } else if (filterBy === 'week') {
      startDate = new Date(today);
      startDate.setDate(today.getDate() - today.getDay());
    } else if (filterBy === 'month') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    }

    this.dataSource.filterPredicate = (data: any) => {
      const createdAt = new Date(data.createdAt);
      if (startDate) {
        return createdAt >= startDate && createdAt <= endDate;
      }
      return true;
    };

    this.dataSource.filter = '' + Math.random(); // Forcer la mise à jour du filtre
  }

  applyStatusFilter(type: string, subType: string = ''): void {
    this._ContactService.getContactList().subscribe({
      next: (res) => {
        // Filtrer les contacts en fonction du type et du sous-type
        let filteredContacts = res.filter((contact: any) => {
          if (type === 'all') {
            return true;
          } else if (type === 'contact') {
            return contact.type_c && contact.type_c.toLowerCase() === 'contact';
          } else if (type === 'prospect') {
            if (subType === 'all') {
              return contact.type_c && contact.type_c.toLowerCase() === 'prospect';
            }
            return (
              contact.type_c &&
              contact.type_c.toLowerCase() === 'prospect' &&
              contact.etat &&
              contact.etat.toLowerCase() === subType
            );
          } else if (type === 'client') {
            if (subType === 'all') {
              return contact.type_c && contact.type_c.toLowerCase() === 'client';
            }
            return (
              contact.type_c &&
              (contact.type_c.toLowerCase() === 'client' ) &&
              contact.statut &&
              contact.statut.toLowerCase() === subType
            );
          }
          return false;
        });
  
        // Définir les colonnes affichées
        if (type === 'prospect') {
          this.displayedColumns = [
            'id',
            'prenom',
            'nom',
            'email',
            'identifiant',
            'type',
            'num',
            'type_c',
            'etat',
            'adresse',
            'pays',
            'action',
          ];
        } else if (type === 'client') {
          this.displayedColumns = [
            'id',
            'prenom',
            'nom',
            'email',
            'identifiant',
            'type',
            'num',
            'statut', // Remplacer 'type_c' par 'statut'
            'adresse',
            'pays',
            'action',
          ];
        } else {
          this.displayedColumns = [
            'id',
            'prenom',
            'nom',
            'email',
            'identifiant',
            'type',
            'num',
            'type_c',
            'adresse',
            'pays',
            'action',
          ];
        }
  
        // Afficher un avertissement si aucun contact ne correspond au filtre
        if (filteredContacts.length === 0) {
          console.warn('Aucune donnée trouvée pour le filtre:', type, subType);
        }
  
        // Mettre à jour la source de données pour la table
        this.dataSource = new MatTableDataSource(filteredContacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données:', err);
      },
    });
  }
  
  

  deleteContact(id: number) {
    this._ContactService.deleteContact(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Contact deleted!', 'done');
        this.getContactList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ContactAddEditComponent, {
      data: data,
    });
  
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.getContactList();
        }
      },
    });
  }

  openViewDialog(data: any): void {
    this._dialog.open(ContactViewDialogComponent, {
      data: data, // Passer les données du contact
      width: '400px',
    });
  }

}
