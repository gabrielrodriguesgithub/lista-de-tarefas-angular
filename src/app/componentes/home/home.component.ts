import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Tarefa } from '../../../models/tarefa.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tarefas: any[] = [];
  tarefaForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private tarefaService: TarefaService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private renderer: Renderer2
  ) {
    this.tarefaForm = this.fb.group({
      titulo: ['', Validators.required],
      prazo: ['', Validators.required],
      concluido: [false],
      descricao: ['', Validators.required]
    });
  }

  mostrarFormularioEdicao: boolean[] = [];
  tarefaSelecionada: Tarefa = new Tarefa(0, 'Título padrão', new Date(), false, 'Descrição padrão'); // Valores padrão, ajuste conforme necessário

  ngOnInit(): void {
    this.loadTarefas();
  }

  loadTarefas(): void {
    this.tarefaService.getTarefas().subscribe(
      (data) => this.tarefas = data,
      (error) => console.error('Erro ao carregar tarefas', error)
    );
  }

  onSubmit(): void {
    if (this.tarefaForm.valid) {
      this.tarefaService.addTarefa(this.tarefaForm.value).subscribe(
        () => {
          this.loadTarefas();
          this.tarefaForm.reset({ concluido: false });
        },
        (error) => {
          console.error('Erro ao adicionar tarefa', error);
          this.errorMessage = 'Erro ao adicionar tarefa. Tente novamente.';
        }
      );
    }
  }

  deletarTarefa(id: number): void {
    this.tarefaService.deletarTarefa(id).subscribe(() => {
      this.loadTarefas(); // Atualiza a lista após deletar a tarefa
    });
  }

  editarTarefa(tarefa: Tarefa, index: number): void {
    if (this.mostrarFormularioEdicao[index]) {
      // Se o componente de edição já estiver visível, ocultamos ele
      this.mostrarFormularioEdicao[index] = false;
    } else {
      // Se o componente de edição não estiver visível, marcamos ele como visível e todos os outros como invisíveis
      this.mostrarFormularioEdicao.fill(false); // Oculta todos os outros componentes de edição
      this.mostrarFormularioEdicao[index] = true; // Exibe o componente de edição da tarefa atual
    }
  }

  
  atualizarTarefa(tarefaAtualizada: Tarefa): void {
  const index = this.tarefas.findIndex(tarefa => tarefa.id === tarefaAtualizada.id);
  if (index !== -1) {
    this.tarefas[index] = tarefaAtualizada;
  }
}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = 'Erro ao fazer logout. Por favor, tente novamente.';
        console.error(err);
      }
    });
  }
  toggleTarefas(): void {
    const tarefaList = document.querySelector('.tarefas-list');
    const tituloTarefa = document.querySelector('.titulo-tarefas');
    if (tarefaList) {
      tarefaList.classList.toggle('hide');
      if(!tarefaList.classList.contains('hide')) {
        if(tituloTarefa) {
          this.mudarMarginBottomElemento(tituloTarefa as HTMLElement, "80px");
        }
      }
      else {
        this.mudarMarginBottomElemento(tituloTarefa as HTMLElement, "500px");
      }
    }
  }

  mudarMarginBottomElemento(element: HTMLElement, pixeis: string): void {
    this.renderer.setStyle(element, 'margin-bottom', pixeis);
  }

  onConcluirTarefa(tarefa: any) {
    this.tarefaService.atualizarTarefa(tarefa).subscribe(response => {
      console.log('Tarefa atualizada com sucesso', response);
    }, error => {
      console.error('Erro ao atualizar tarefa', error);
    });
  }
}
