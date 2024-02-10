import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Professor } from "../models/pessoa.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Disciplina } from "../models/disciplina.model";
import { Assunto } from "../models/assunto.model";

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('assunto')
  }

  salvar(assunto: Assunto): Observable<Assunto> {
    return this.http.post<Assunto>(this.baseUrl, assunto);
  }

  obterAssuntos(): Observable<Assunto[]>{
    return this.http.get<Assunto[]>(`${this.baseUrl}/lista`);
  }

  obterAssuntoByDisciplina(disciplina: Disciplina): Observable<Assunto[]> {
    return this.http.get<Assunto[]>(`${this.baseUrl}/disciplina?id=${disciplina.id}`);
  }
}
