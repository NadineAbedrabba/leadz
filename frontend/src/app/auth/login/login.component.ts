import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get name() {
    return this.loginForm.get('name')!;
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(loginFormulaire: NgForm) {
    // Vérification si la fonction est bien appelée
    console.log('Fonction onSubmit appelée.');
  
    // Vérification si le formulaire est invalide
    if (loginFormulaire.invalid) {
      console.log('Formulaire invalide. Erreurs:', loginFormulaire.controls);
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
  
    // Réinitialisation du message d'erreur
    this.errorMessage = null;
  
    // Activation de l'état de chargement
    this.isLoading = true;
  
    // Récupération des données du formulaire
    const formData = loginFormulaire.value;
    console.log('Données du formulaire soumises :', formData);
  
    // Préparation des credentials pour l'API
    const credentials = {
      username: formData.email, // Associez ici les champs correctement
      password: formData.password,
    };
    console.log('Credentials pour l\'authentification :', credentials);
  
    // Appel au service d'authentification
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Réponse réussie de l\'API :', response);
  
        // Désactivation de l'état de chargement
        this.isLoading = false;
  
        // Stockage du jeton d'accès
        localStorage.setItem('access_token', response.access_token);
  
        // Redirection vers la page souhaitée
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'appel au service :', error);
  
        // Désactivation de l'état de chargement en cas d'erreur
        this.isLoading = false;
  
        // Gestion des erreurs selon le statut
        if (error.status === 404) {
          this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
        } else {
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      }
    });
  }
  
  

}