import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7086/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/loginn`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Aqui você pode adicionar lógica adicional para validar o token, se necessário
    return !!token;
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('jwtToken');
      })
    )
  }
}
