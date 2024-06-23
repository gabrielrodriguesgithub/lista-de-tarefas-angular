import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarefa } from '../../models/tarefa.model';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private baseUrl = 'https://localhost:7086/tarefas';

  constructor(private http: HttpClient) {}

  getTarefas(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  addTarefa(tarefa: any): Observable<any> {
    return this.http.post(this.baseUrl, tarefa);
  }
  
  deletarTarefa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  editarTarefa(tarefa: Tarefa): Observable<void> {
    return this.http.put<void>(this.baseUrl, tarefa);
  }

  atualizarTarefa(tarefa: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, tarefa);
  }
}
