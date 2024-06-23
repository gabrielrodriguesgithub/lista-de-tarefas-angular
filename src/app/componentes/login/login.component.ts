import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        response => {
          console.log('Login response:', response); // Adicionando log de depuração
          if (response && response.token) { // Verifique se a propriedade do token está correta
            this.authService.setToken(response.token);
            this.router.navigate(['/']); // Redireciona para a página principal após o login
          } else {
            this.errorMessage = 'Erro no login. Tente novamente.';
          }
        },
        error => {
          console.error('Login error:', error); // Adicionando log de depuração
          this.errorMessage = 'E-mail ou senha inválidos';
        }
      );
    }
  }
}
