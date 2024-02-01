import { Disciplina } from "./disciplina.model";

export class Assunto {
  constructor () {

  }
}

export interface Assunto {
  id: number;
  descricao: string;
  ativo: boolean;
  disciplina: Disciplina;
}
