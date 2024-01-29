import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Professor } from "../models/pessoa.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Disciplina } from "../models/disciplina.model";

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('disciplina')
  }

  salvar(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.baseUrl, disciplina);
  }

  obterDisciplinas(): Observable<Disciplina[]>{
    return this.http.get<Disciplina[]>(`${this.baseUrl}/lista`);
  }

}
