import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Pessoa } from "../models/pessoa.model";
import { Router } from "@angular/router";
import { Login } from "../models/login.model";
import { RotasApp } from "src/app/shared/enum/rotas-app";
import { Permissao } from "../models/permissoes.model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly PESSOA = 'xxydedd';
  private readonly PERMISSOES = 'sdadtf';
  private readonly TICKET = 'sdaser';
  private readonly TOKEN = 'aewqdr';
  private readonly DATA_ATUAL = 'pordae'

  private readonly POS_INIT = 2;
  loggedIn = new BehaviorSubject<boolean>(false);
  nome = new BehaviorSubject<string>('');

  private currentUserSubject: BehaviorSubject<Pessoa>
  public currentUser: Observable<Pessoa>;

  constructor( private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Pessoa>((JSON.parse(this.getDecode(this.PESSOA))));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get getCurrentUser(): Pessoa {
    return this.currentUserSubject.value;
  }

  login(login: Login) {
    this.setEncode(this.PERMISSOES, login.permissoes );
    this.setEncode(this.DATA_ATUAL, login.dataAtual );
    sessionStorage.setItem(this.TOKEN, JSON.stringify(login.token));
    this.setPessoa(login.pessoa)
    this.setLoggedUser(true);
    return login;
  }

  logout() {
    sessionStorage.clear()
    let pessoa: Pessoa = new Pessoa;
    this.currentUserSubject.next(pessoa);
    this.setLoggedUser(false);
    this.router.navigate([RotasApp.HOME])
  }

  getToken(): string {
    return JSON.parse(sessionStorage.getItem(this.TOKEN))
  }

  isAuthenticated(): boolean {
    let value: string  = sessionStorage.getItem(this.TOKEN);
    if(value)
      return true;
    return false;
  }

  private getDecode(key: string): string {
    return this.decode(sessionStorage.getItem(key))
  }

  private setEncode(key: string, value: any) {
    sessionStorage.setItem(key, this.encode(JSON.stringify(value)));
  }

  hasPermissao(roles: string[]): boolean {
    let permissoes: Permissao[] = JSON.parse(this.getDecode(this.PERMISSOES));
    let resultado: boolean = false;
    for (let index = 0; index < roles.length; index++) {
      let role: Permissao = roles[index]
      resultado = permissoes?.indexOf(role) !== -1;
      if(resultado)
        break
    }
    return resultado
  }

  setPessoa(pessoa: Pessoa): void {
    this.setEncode(this.PESSOA, pessoa );
    this.currentUserSubject.next(pessoa);
  }

  get dataAtual(): Date {
    let dataAtual: Date =  JSON.parse(this.getDecode(this.DATA_ATUAL));
    return dataAtual
  }

  private encode(str: string): string {
    let str64 = btoa(str)
    str64 = this.addChar(str64,this.POS_INIT)
    return str64
  }

  private decode(str: string): string {
    if(!str){
      return null
    }
    let position  = this.POS_INIT + 1
    let response = str.substring(0,position - 1) + str.substring(position, str.length);
    return atob(response)
  }

  private addChar( str: string, position: number): string {
    let laranja: string = this.generateRandomString();
    let resultado = [str.slice(0, position), laranja, str.slice(position)].join('');
    return resultado
  }

  private generateRandomString(): string {
    let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result= '';
    let charactersLength = characters.length;
    result = characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

setLoggedUser(isLogged: boolean): void {
  this.loggedIn.next(isLogged);
  this.nome.next(this.getCurrentUser.nome);
}

getLoggedUser(): Observable<boolean> {
  return this.loggedIn.asObservable();
}

getNameLoggedUser(): Observable<string> {
  return this.nome.asObservable();
}

}
