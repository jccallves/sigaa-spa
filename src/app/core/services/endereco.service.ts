import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Endereco } from "../models/endereco.model";

@Injectable({
  providedIn: 'root'
})
export class EndereconService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl.concat('endereco')
  }

  obterEnderecoPorCep(cep: number): Observable<Endereco>{
    return this.http.get<Endereco>(`${this.baseUrl}/cep?cep=${cep}`);
  }

}
