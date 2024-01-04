import { TipoQuestao } from '../models/tipoQuestao.model';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NivelQuestao } from '../models/nivelQuestao.model';

@Injectable({
  providedIn: 'root'
})
export class NivelQuestaoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('nivel')
  }

  salvar(nivelQuestao: NivelQuestao): Observable<NivelQuestao> {
    return this.http.post<NivelQuestao>(this.baseUrl, nivelQuestao);
  }

}
