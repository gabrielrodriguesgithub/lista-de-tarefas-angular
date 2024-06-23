import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tarefa } from '../../../models/tarefa.model';
import { TarefaService } from '../../services/tarefa.service';

@Component({
  selector: 'app-editar-tarefa',
  templateUrl: './editar-tarefa.component.html',
  styleUrls: ['./editar-tarefa.component.css']
})
export class EditarTarefaComponent {
  @Input() tarefa!: Tarefa; 
  @Output() tarefaEditada = new EventEmitter<Tarefa>(); 

  tarefaEditadaLocal: Tarefa; 

  constructor(private tarefaService: TarefaService) {
    this.tarefaEditadaLocal = { ...this.tarefa }; 
  }

  editarTarefa(): void {
    const tarefaAtualizada: Tarefa = { ...this.tarefa }; 
    
    // Atualizar apenas as propriedades modificadas
    if (this.tarefaEditadaLocal.titulo !== undefined) {
      tarefaAtualizada.titulo = this.tarefaEditadaLocal.titulo;
    }
    if (this.tarefaEditadaLocal.prazo !== undefined) {
      tarefaAtualizada.prazo = this.tarefaEditadaLocal.prazo;
    }
    if (this.tarefaEditadaLocal.concluido !== undefined) {
      tarefaAtualizada.concluido = this.tarefaEditadaLocal.concluido;
    }
    if (this.tarefaEditadaLocal.descricao !== undefined) {
      tarefaAtualizada.descricao = this.tarefaEditadaLocal.descricao;
    }

    this.tarefaService.editarTarefa(tarefaAtualizada).subscribe(() => {
      this.tarefaEditada.emit(tarefaAtualizada); 
    });
  }
}
