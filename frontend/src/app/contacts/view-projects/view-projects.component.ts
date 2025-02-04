import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { ContactService } from '../../services/contact.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProjectAddEditComponent } from '../../projets/project-add-edit/project-add-edit.component';
import { CoreService } from '../../core/core.service';
import { ProjectViewDialogComponent } from 'src/app/projets/project-view-dialog/project-view-dialog.component';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.css'],
})
export class ViewProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nomProjet',
    'description',
    'dateCreation',
    'statutProjet',
    'nomClient',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  contactId: number | null = null;
  contactName: string = '';
  contactStatus: string = ''; // "prospect" ou "client"
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private contactService: ContactService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    const contactId = this.route.snapshot.paramMap.get('id');
    console.log('Contact ID from URL:', contactId);

    if (!contactId) {
      this.errorMessage = "L'ID du client est manquant dans l'URL.";
      this.isLoading = false;
      return;
    }

    this.contactId = +contactId;
    this.loadContactDetails();
    this.loadProjects();
  }

  loadContactDetails(): void {
    this.contactService.getContactById(this.contactId!).subscribe({
      next: (contact) => {
        this.contactName = `${contact.prenom} ${contact.nom}`;
        this.contactStatus = contact.typeContact; // "prospect" ou "client"
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du contact:', err);
        this.contactName = 'Contact inconnu';
        this.contactStatus = 'inconnu';
      },
    });
  }

  loadProjects(): void {
    this.projectService.getProjectsByContactId(this.contactId!).subscribe({
      next: (projects) => {
        console.log('Projets récupérés:', projects);

        // Charger le nom du client pour chaque projet
        projects.forEach((project) => {
          this.loadClientDetails(project);
        });

        this.dataSource = new MatTableDataSource(projects);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
        this.errorMessage = 'Impossible de récupérer les projets. Veuillez réessayer plus tard.';
        this.isLoading = false;
      },
    });
  }

  private loadClientDetails(project: any): void {
    if (project.contact?.id) {
      this.contactService.getContactById(project.contact.id).subscribe({
        next: (contact) => {
          console.log(`Client récupéré pour projet ${project.id}:`, contact);
          project.nomClient = `${contact.nom} ${contact.prenom}` || 'Non renseigné';
          this.dataSource.data = [...this.dataSource.data]; // Mettre à jour le tableau
        },
        error: (err) => {
          console.error(`Erreur lors de la récupération du client pour le projet ${project.id}:`, err);
          project.nomClient = 'Erreur lors du chargement';
          this.dataSource.data = [...this.dataSource.data]; // Mettre à jour le tableau
        },
      });
    } else {
      console.warn(`Aucun contactId fourni pour le projet ${project.id}`);
      project.nomClient = 'ID contact manquant';
      this.dataSource.data = [...this.dataSource.data]; // Mettre à jour le tableau
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any): void {
    const dialogRef = this._dialog.open(ProjectAddEditComponent, { data });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadProjects();
        }
      },
    });
  }

  openProjectDialog(project: any) {
    console.log('Données du projet avant ouverture:', project);
    this._dialog.open(ProjectViewDialogComponent, { data: project });
  }

  openAddProjectForm(): void {
    const dialogRef = this._dialog.open(ProjectAddEditComponent, {
      data: { contactId: this.contactId },
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.loadProjects();
        }
      },
    });
  }

  canAddProject(): boolean {
    return (
      this.contactStatus !== 'prospect' &&
      this.dataSource?.data.every(
        (project) =>
          project.statutProjet !== 'non décroché' &&
          project.statutProjet !== 'en cours de négociation'
      )
    );
  }
}