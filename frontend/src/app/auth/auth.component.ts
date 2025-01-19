import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  

  onSubmit(loginFormulaire: NgForm): void {
    if (loginFormulaire.valid) {
      const { name: username, password } = loginFormulaire.value;

      this.authService.login({ username, password }).subscribe({
        next: (response) => {
          // Stockez le jeton JWT dans le localStorage
          localStorage.setItem('access_token', response.access_token);

          // Redirigez l'utilisateur vers une autre page (par exemple, profil)
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.errorMessage = 'Nom ou mot de passe incorrect';
        },
      });
    }
  }  
}
