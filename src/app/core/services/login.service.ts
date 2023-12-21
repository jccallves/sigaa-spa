import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Login } from "../models/login.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiUrl.concat('login')
  }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>(this.baseUrl, login);
  }

}
