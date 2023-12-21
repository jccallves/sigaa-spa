export class Endereco implements Endereco {
  constructor () {

  }
}

//https://viacep.com.br/ws/28070246/json/

export interface Endereco {
  id: number;
  logradouro: string;
  localidade: string;
  numero: number;
  bairro: string;
  complemento: string;
  uf: string;
  cep: number;
}
