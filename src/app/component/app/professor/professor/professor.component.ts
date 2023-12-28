import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EndereconService } from 'src/app/core/services/endereco.service';
import { finalize } from 'rxjs/operators';
import { Professor } from 'src/app/core/models/pessoa.model';
import { Endereco } from 'src/app/core/models/endereco.model';
import { Contato } from 'src/app/core/models/contato.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfessorService } from 'src/app/core/services/professor.service';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss'],
})
export class ProfessorComponent implements OnInit {
  exibirSpinner: boolean = false;
  isCepCarregado: boolean = false;
  docsFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  contactFormGroup: FormGroup;
  formDocsValido: boolean;
  professor: Professor;

  constructor(
    private _formBuilder: FormBuilder,
    private enderecoService: EndereconService,
    private professorService: ProfessorService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  salvarUsuario() {
    if (this.docsFormGroup.valid &&
        this.addressFormGroup.valid &&
        this.contactFormGroup.valid) {

          this.exibirSpinner = true
          let professor: Professor = this.mapperForm2Professor();
          this.professorService.salvar(professor)
        .pipe(
          finalize(() => {
            this.exibirSpinner = false
            this.authService.setPessoa(professor)
          })
        )
        .subscribe({
          next: professorResponse => {
            this.mapperProfessor2Form(professorResponse)
            if (!professor.ativo && professorResponse.ativo) {
              this.openSnackBar("Usuário foi salvo com sucesso. Favor refazer o login.", "X")
              this.authService.logout()
            } else
              this.openSnackBar("Usuário foi salvo com sucesso.", "X")
          },
          error: error => {
            this.openSnackBar("Error ao salvar dados do usuário.", "X")
          }
        });
    }
  }

  private createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let numberOnlyRegex: RegExp = /^[0-9]*$/
    let doubleOnlyRegex: RegExp = /^\d{1,2}(\.\d{0,2}){0,1}$/
    this.docsFormGroup = this._formBuilder.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(emailregex)]],
      cpf: ['', [Validators.required, Validators.maxLength(11), Validators.pattern(numberOnlyRegex)]],
      matricula: null,
      senha: ['', Validators.required],
      confirmacao_senha: ['', Validators.required],
      id: null,
      ativo: null,
    });
    this.addressFormGroup = this._formBuilder.group({
      cep: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(8)],
      ],
      logradouro: [{ value: '', disabled: true }, null, [Validators.required]],
      localidade: [{ value: '', disabled: true }, null, [Validators.required]],
      bairro: [{ value: '', disabled: true }, null, [Validators.required]],
      uf: [{ value: '', disabled: true },
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      numero: [null],
      complemento: null,
      id: null,
    });
    this.contactFormGroup = this._formBuilder.group({
      ddd: [
        null,
        [Validators.required, Validators.minLength(2), Validators.maxLength(2)],
      ],
      numero: [
        null,
        [Validators.required, Validators.minLength(8), Validators.maxLength(9)],
      ],
      id: null,
    });
  }

  carregarCepOnBlur(): void {
    if (!this.isCepCarregado) {
      this.carregarCep();
    }
  }

  carregarCep(): void {
    if (this.addressFormGroup.get('cep').valid) {
      this.exibirSpinner = true;
      this.enderecoService
        .obterEnderecoPorCep(this.addressFormGroup.get('cep').value)
        .pipe(
          finalize(() => {
            this.exibirSpinner = false;
          })
        )
        .subscribe({
          next: (endereco) => {
            if (endereco.logradouro) {
              endereco.complemento = null;
              this.addressFormGroup.patchValue(endereco);
              this.isCepCarregado = true;
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }

  private mapperForm2Professor() {
    let professor: Professor = new Professor();
    let endereco: Endereco = new Endereco();
    let contato: Contato = new Contato();
    Object.assign(professor, this.docsFormGroup.value);
    Object.assign(endereco, this.addressFormGroup.value);
    Object.assign(contato, this.contactFormGroup.value)
    professor.cpf = this.docsFormGroup.get('cpf').value;
    professor.endereco = endereco;
    professor.contato = contato
    return professor;
  }

  private mapperProfessor2Form(professorResponse: Professor) {
    this.professor = professorResponse;
    this.docsFormGroup.patchValue(professorResponse);
    this.addressFormGroup.patchValue(professorResponse.endereco);
    this.contactFormGroup.patchValue(professorResponse.contato);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000
    });
  }

  getErrorNome() {
    return this.docsFormGroup.get('nome').hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorEmail() {
    return this.docsFormGroup.get('email').hasError('required') ? 'Campo obrigatório' :
      this.docsFormGroup.get('email').hasError('pattern') ? 'Não é um email válido' :  '';
  }

  getErrorCpf() {
    return this.docsFormGroup.get('cpf').hasError('maxlength') ? 'Apenas 11 caracteres' :
    this.docsFormGroup.get('cpf').hasError('required') ? 'Campo obrigatório' :
      this.docsFormGroup.get('cpf').hasError('pattern') ? 'Apenas números' : '';
  }

  getErrorSenha() {
    return this.docsFormGroup.get('senha').hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorConfirmaSenha() {
    return this.docsFormGroup.get('confirmacao_senha').hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorDDD() {
    return this.contactFormGroup.get('ddd').hasError('maxlength') ? 'Apenas 2 caracteres' :
    this.docsFormGroup.get('ddd').hasError('required') ? 'Campo obrigatório' :
      this.docsFormGroup.get('ddd').hasError('minlength') ? 'Apenas 2 caracteres' : '';
  }

  getErrorNumero() {
    return this.docsFormGroup.get('numero').hasError('required') ? 'Campo obrigatório' : '';
  }

}
