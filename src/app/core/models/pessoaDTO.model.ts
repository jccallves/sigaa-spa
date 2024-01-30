import { Contato } from "./contato.model";
import { Endereco } from "./endereco.model";

export class PessoaDTO implements PessoaDTO {
  constructor() {

  }
}

export class Professor implements Professor {
  constructor() {

  }
}

export interface PessoaDTO {
  id: number;
  cpf: string;
  nome: string;
  email: string;
  criado_em: Date;
  alterado_em: Date;
  ativo: boolean;

}

export interface Professor extends PessoaDTO {

  matricula: number;
  pessoa: PessoaDTO;
  contato: Contato;
  endereco: Endereco;
}
