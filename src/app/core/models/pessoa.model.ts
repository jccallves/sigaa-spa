import { Contato } from "./contato.model";
import { Endereco } from "./endereco.model";

export class Pessoa implements Pessoa {
  constructor() {

  }
}

export class Professor implements Professor {
  constructor() {

  }
}

export interface Pessoa {
  id: number;
  cpf: string;
  nome: string;
  email: string;
  senha: string;
  criado_em: Date;
  alterado_em: Date;
  ativo: boolean;

}

export interface Professor extends Pessoa {

  matricula: number;
  pessoa: Pessoa;
  contato: Contato;
  endereco: Endereco;
}
