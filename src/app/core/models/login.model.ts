import { Pessoa } from "./pessoa.model";

export class Login implements Login {
  constructor(){

  }
}

export interface Login {
  token: string;
  pessoa: Pessoa;
  permissoes: string[];
  dataAtual: Date;
}
