import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { Login } from 'src/app/core/models/login.model';
import { Pessoa } from 'src/app/core/models/pessoa.model';
import { LoginService } from 'src/app/core/services/login.service';
import { RotasApp } from 'src/app/shared/enum/rotas-app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {

  formGroupLogin: FormGroup;
  cpf = new FormControl('', [Validators.required, Validators.maxLength(11)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.required]);
  credentials: Login;
  exibirSpinner: boolean;
  public currentUser: Observable<Pessoa>;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private route: ActivatedRoute,
    private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.currentUser = this.authService.currentUser
    this.validations();
     if (this.authService.isAuthenticated()) {
      let login: Login = new Login();
      login.token = this.authService.getToken();
      if (login) {
        this.treatLogin(login)
      } else {
        this.router.navigate([RotasApp.LOGIN]);
      }
    } else {
      this.router.navigate([RotasApp.LOGIN]);
    }
  }

  logout() {
    this.authService.logout();
  }

  login() {
    if (this.formGroupLogin.valid) {

      this.exibirSpinner = true
      let cred: Login = this.mapperForm2Aluno();
      this.loginService.login(cred).subscribe({
        next: response => {
          let login: Login = response
          this.authService.login(login)
          if(login.pessoa.ativo){
            this.router.navigate([RotasApp.HOME])
          }else {
            this.router.navigate([RotasApp.LOGIN])
          }
        },
        error: error => {
          this.openSnackBar("Error ao realzar o login. " + error.status, "x");
          this.router.navigate([RotasApp.LOGIN])
        }
      });
      this.exibirSpinner = false


    }
   }


  private treatLogin(login: Login): void {
    this.exibirSpinner = true
    this.loginService.login(login).subscribe({
      next: response => {
        let login: Login = response
        this.authService.login(login)
        if(login.pessoa.ativo){
          this.exibirSpinner = false
          this.router.navigate([RotasApp.HOME])
        }else {
          this.exibirSpinner = false
          this.router.navigate([RotasApp.LOGIN])
        }
      },
      error: error => {
        this.exibirSpinner = false
        this.openSnackBar("Error ao realzar o login. " + error.status, "x");
        this.router.navigate([RotasApp.HOME])
      }
    });
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'Campo obrigatório' :
    this.email.hasError('pattern') ? 'Não é email válido' :
    this.email.hasError('alreadyInUse') ? 'Este email já está sendo usado' : '';
}

getCpfErrorMessage() {
  return this.cpf.hasError('required') ? 'Campo obrigatório' :
  this.cpf.hasError('pattern') ? 'CPF válido' :
  this.cpf.hasError('alreadyInUse') ? 'Este CPF já está cadastrado' : '';
}

getPasswordErrorMessage() {
  return this.password.hasError('required') ? 'Campo obrigatório' : '';
}

  private validations() {
    let emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let numberOnlyRegex: RegExp = /^[0-9]*$/
    let doubleOnlyRegex: RegExp = /^\d{1,2}(\.\d{0,2}){0,1}$/
    this.formGroupLogin = this.formBuilder.group({
      cpf: [null, [Validators.required, Validators.pattern(numberOnlyRegex)]],
      //email: [null, [Validators.required, Validators.pattern(emailRegex)]],
      password: [null, [Validators.required]],
    });
  }

  get cpfForm() {
    return this.formGroupLogin.get('cpf') as FormControl
  }


  private mapperForm2Aluno() {
    let credential: Login = new Login();
    let pessoa: Pessoa = new Pessoa();
    Object.assign(credential, this.formGroupLogin.value);
    pessoa.cpf = this.formGroupLogin.get('cpf').value;
    pessoa.senha = this.formGroupLogin.get('password').value;
    credential.pessoa = pessoa;
    return credential;
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000
    });
  }


}
