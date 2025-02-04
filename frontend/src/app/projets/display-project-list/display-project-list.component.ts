import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddEditComponent } from '../project-add-edit/project-add-edit.component';
import { ContactService } from '../../services/contact.service';
import { ProjectService } from '../../services/project.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../../core/core.service';
import { ProjectViewDialogComponent } from '../project-view-dialog/project-view-dialog.component';

@Component({
  selector: 'display-project-list',
  templateUrl: './display-project-list.component.html',
  styleUrls: ['./display-project-list.component.css'],
})
export class DisplayProjectListComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nomProjet',
    'description',
    'dateCreation',
    'statutProjet',
    'nomClient', // Ajout de la colonne pour le nom du client
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private projectService: ProjectService,
    private contactService: ContactService, // Injecter le service ContactService
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getProjectList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(ProjectAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProjectList();
        }
      },
    });
  }

  getProjectList() {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        console.log('Projets récupérés:', projects);

        // Initialiser le dataSource avec les projets récupérés
        this.dataSource = new MatTableDataSource(projects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        // Charger le nom du client pour chaque projet
        projects.forEach((project) => {
          this.loadClientDetails(project);
        });
      },
      error: console.log,
    });
  }

  private loadClientDetails(project: any): void {
    this.contactService.getContactById(project.contact?.id).subscribe({
      next: (contact) => {
        console.log(`Client récupéré pour projet ${project.id}:`, contact);
        project.nomClient = `${contact.nom} ${contact.prenom}` || 'Non renseigné';
        this.updateDataSource(); // Mettre à jour le tableau
      },
      error: (err) => {
        console.error(`Erreur lors de la récupération du client pour le projet ${project.id}:`, err);
        project.nomClient = 'Erreur lors du chargement';
        this.updateDataSource(); // Mettre à jour le tableau
      },
    });
  }

  private updateDataSource(): void {
    if (this.dataSource) {
      this.dataSource.data = [...this.dataSource.data]; // Mettre à jour le tableau
    }
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
      const createdAt = new Date(data.dateCreation);
      if (startDate) {
        return createdAt >= startDate && createdAt <= endDate;
      }
      return true;
    };

    this.dataSource.filter = '' + Math.random(); // Forcer la mise à jour du filtre
  }

  deleteEmployee(id: number) {
    this.projectService.deleteProject(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getProjectList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ProjectAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProjectList();
        }
      },
    });
  }

  openProjectDialog(project: any) {
    console.log('Données du projet avant ouverture:', project); // Debugging
    this._dialog.open(ProjectViewDialogComponent, {
      data: project,
    });
  }
}
