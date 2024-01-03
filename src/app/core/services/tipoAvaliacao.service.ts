import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Professor } from "../models/pessoa.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Disciplina } from "../models/disciplina.model";
import { TipoAvaliacao } from "../models/tipoAvaliacao.model";

@Injectable({
  providedIn: 'root'
})
export class TipoAvaliacaoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('tipoavaliacao')
  }

  salvar(tipoAvaliacao: TipoAvaliacao): Observable<TipoAvaliacao> {
    return this.http.post<TipoAvaliacao>(this.baseUrl, tipoAvaliacao);
  }

}
