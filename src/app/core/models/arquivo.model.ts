export class Arquivo implements Arquivo{
  constructor() {

  }
}

export interface Arquivo{
  id: number;
    nomeArquivo: string;
    descricao: string;
    file: File
    progress: number
}
