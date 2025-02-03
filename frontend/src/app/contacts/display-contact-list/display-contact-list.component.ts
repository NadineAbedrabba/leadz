import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddEditComponent } from '../contact-add-edit/contact-add-edit.component';
import { ContactService } from '../../services/contact.service';
import { ProspectService } from '../../services/prospect.service';
import { ClientService } from '../../services/client.service';
import { ProjectService } from '../../services/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { Project } from '../../models/project.model';
import { Contact } from 'src/app/models/contact.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Client } from 'src/app/models/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';

import { ContactViewDialogComponent } from '../contact-view-dialog/contact-view-dialog.component';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'display-contact-list',
  templateUrl: './display-contact-list.component.html',
  styleUrls: ['./display-contact-list.component.css']
})
export class DisplayContactListComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'prenom', 'nom', 'email', 'identifiant', 'type', 'num', 'type_c', 'adresse', 'pays', 'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentStatusFilter: string = '';
  currentDateFilter: string = '';

  contact$: Observable<Contact> = new Observable();
  prospect$: Observable<Prospect> = new Observable();
  client$: Observable<Client> = new Observable();
  routerSubscription: any;

  constructor(
    private _dialog: MatDialog,
    private _ContactService: ContactService,
    private _ProspectService: ProspectService,
    private _ClientService: ClientService,
    private _ProjectService: ProjectService,
    private _coreService: CoreService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getContactList();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event.url); // Vérifiez que la navigation est détectée
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe(); // Désabonnez-vous pour éviter les fuites de mémoire
    }
  }

  openAddEditContactForm() {
    const dialogRef = this._dialog.open(ContactAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContactList(); // Met à jour la liste après ajout ou modification
        }
      },
    });
  }

  getContactList() {
    this._ContactService.getAllContacts().subscribe({
      next: (contacts) => {
        this.dataSource = new MatTableDataSource(contacts);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Erreur lors de la récupération des contacts:', err),
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Appliquer un filtre par statut (contact, prospect, client, etc.)
  applyStatusFilter(type: string, subType: string = ''): void {
    if (type === 'all') {
      // Récupérer tous les contacts, prospects et clients
        this._ContactService.getAllContacts().subscribe({
        next: (res) => {
          this.displayedColumns = [
            'id', 'prenom', 'nom', 'email', 'identifiant', 'type', 'num', 'type_c', 'adresse', 'pays', 'action'
          ];
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => console.error('Erreur lors de la récupération des contacts, prospects et clients:', err),
      });
    } else if (type === 'contact') {
      // Filtrer uniquement les contacts
      this._ContactService.getAllContactsOnly().subscribe({
        next: (res) => {
          this.displayedColumns = [
            'id', 'prenom', 'nom', 'email', 'identifiant', 'type', 'num', 'type_c', 'adresse', 'pays', 'action'
          ];
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => console.error('Erreur lors de la récupération des contacts:', err),
      });
    } else if (type === 'prospect') {
      // Filtrer uniquement les prospects
      this._ProspectService.getAllProspects().subscribe({
        next: (res) => {
          let filteredContacts = res.filter((contact: any) => {
            return subType === 'all' || (contact.etat && contact.etat.toLowerCase() === subType);
          });

          this.displayedColumns = [
            'id', 'prenom', 'nom', 'email', 'identifiant', 'type', 'num', 'type_c', 'etat', 'adresse', 'pays', 'action'
          ];

          this.dataSource = new MatTableDataSource(filteredContacts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => console.error('Erreur lors de la récupération des prospects:', err),
      });
    } else if (type === 'client') {
      // Filtrer uniquement les clients
      this._ClientService.getAllClients().subscribe({
        next: (res) => {
          let filteredContacts = res.filter((contact: any) => {
            return subType === 'all' || (contact.statut && contact.statut.toLowerCase() === subType);
          });

          this.displayedColumns = [
            'id', 'prenom', 'nom', 'email', 'identifiant', 'type', 'num', 'statut', 'adresse', 'pays', 'action'
          ];

          this.dataSource = new MatTableDataSource(filteredContacts);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err) => console.error('Erreur lors de la récupération des clients:', err),
      });
    }
  }

  // Appliquer un filtre par date
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


  deleteContact(id: number, type: string) {
    console.log('Suppression du contact avec ID:', id, 'et type:', type);
  
    let deleteObservable;
  
    // Selon le type, on choisit la méthode de suppression appropriée
    switch (type) {
      case 'prospect':
        deleteObservable = this._ProspectService.deleteProspect(id);
        break;
      case 'client':
        deleteObservable = this._ClientService.deleteClient(id);
        break;
      case 'contact':
        deleteObservable = this._ContactService.deleteContact(id);
        break;
      default:
        console.error('Type de contact non reconnu');
        return;
    }
  
    deleteObservable.subscribe({
      next: () => {
        this._coreService.openSnackBar('Contact supprimé avec succès !', 'Terminé');
        this.removeRowFromDataSource(id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du contact:', err);
      },
    });
  }
  

  removeRowFromDataSource(id: number) {
    const data = this.dataSource.data;
    const index = data.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      data.splice(index, 1);
      this.dataSource.data = [...data]; // Mettre à jour la source de données
    }
  }

  openEditForm(row: any) {
    let serviceCall: Observable<Contact | Prospect | Client>;
  
    if (row.typeContact === 'prospect') {
      serviceCall = this._ProspectService.getProspectById(row.id);
    } else if (row.typeContact === 'client') {
      serviceCall = this._ClientService.getClientById(row.id);
    }
     else {
      serviceCall = this._ContactService.getContactById(row.id);
    }
  
    // Subscribe with explicit typing
    serviceCall.subscribe({
      next: (fullData: Contact | Prospect | Client) => {
        const dialogRef = this._dialog.open(ContactAddEditComponent, {
          data: fullData, // Pass full data to the dialog
        });
  
        dialogRef.afterClosed().subscribe((val) => {
          if (val) {
            this.getContactList(); // Refresh the list after editing
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données :', err);
      },
    });
  }
  

  openViewDialog(contact: any) {
    this._dialog.open(ContactViewDialogComponent, {
      data: contact,
    });
  }
}
