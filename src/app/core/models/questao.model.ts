import { Disciplina } from "./disciplina.model";
import { NivelQuestao } from "./nivelQuestao.model";
import { Resposta } from "./resposta.model";
import { TipoQuestao } from "./tipoQuestao.model";

export class Questao implements Questao{
  constructor() {

  }
}

export interface Questao{
  id: number;
  codigo: string;
  assunto: string;
  descricao: string;
  banca: string;
  disciplina: Disciplina;
  nivelQuestao: NivelQuestao;
  tipoQuestao: TipoQuestao;
  respostas: Resposta;
  ativo: boolean;
}
