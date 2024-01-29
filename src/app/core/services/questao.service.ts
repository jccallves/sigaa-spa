import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Professor } from "../models/pessoa.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Questao } from "../models/questao.model";

@Injectable({
  providedIn: 'root'
})
export class QuestaoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('questao')
  }

  salvar(questao: Questao): Observable<Questao> {
    return this.http.post<Questao>(this.baseUrl, questao);
  }

}
