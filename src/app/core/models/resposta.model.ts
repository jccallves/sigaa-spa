export class Resposta implements Resposta{
  constructor() {

  }
}

export interface Resposta{
  id: number;
  opcao1: string;
  opcao2: string;
  opcao3: string;
  opcao4: string;
  opcao5: string;
  ativo: boolean;
}
