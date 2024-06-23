export class Tarefa {
    id: number;
    titulo: string;
    prazo: Date;
    concluido: boolean;
    descricao: string;
  
    constructor(id: number, titulo: string, prazo: Date, concluido: boolean, descricao: string) {
      this.id = id;
      this.titulo = titulo;
      this.prazo = prazo;
      this.concluido = concluido;
      this.descricao = descricao;
    }
  }