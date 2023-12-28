import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Professor } from "../models/pessoa.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
     this.baseUrl = environment.apiUrl.concat('professor')
  }

  salvar(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.baseUrl, professor);
  }

}
