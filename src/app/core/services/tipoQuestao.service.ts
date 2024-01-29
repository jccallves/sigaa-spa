import { TipoQuestao } from '../models/tipoQuestao.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TipoQuestaoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('tipoquestao')
  }

  salvar(tipoQuestao: TipoQuestao): Observable<TipoQuestao> {
    return this.http.post<TipoQuestao>(this.baseUrl, tipoQuestao);
  }

  obterTiposQuestoes(): Observable<TipoQuestao[]>{
    return this.http.get<TipoQuestao[]>(`${this.baseUrl}/lista`);
  }

}
