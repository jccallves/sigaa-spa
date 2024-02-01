import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Assunto } from 'src/app/core/models/assunto.model';
import { Disciplina } from 'src/app/core/models/disciplina.model';
import { AssuntoService } from 'src/app/core/services/assunto.service';
import { DisciplinaService } from 'src/app/core/services/disciplina.service';
import { RotasApp } from 'src/app/shared/enum/rotas-app';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-assunto',
  templateUrl: './assunto.component.html',
  styleUrls: ['./assunto.component.scss']
})
export class AssuntoComponent implements OnInit {

  exibirSpinner: boolean = false;
  disciplinas: Disciplina[];
  cadastroAssuntoFormGroup: FormGroup;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private disciplinaService: DisciplinaService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router,
    private assuntoService: AssuntoService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.carregarDisciplinas();
  }

  private createForm() {
    this.cadastroAssuntoFormGroup = this.formBuilder.group({
      descricao: ['', [Validators.required]],
      disciplina: ['', [Validators.required]],
      id: null,
      ativo: null,
    });
  }

  private mapperForm2Questao(): Assunto {
    let assunto: Assunto = new Assunto();
    Object.assign(assunto, this.cadastroAssuntoFormGroup.value);
    return assunto;
  }

  private mapperQuestao2Form(assuntoResponse: Assunto) {
    this.cadastroAssuntoFormGroup.patchValue(assuntoResponse);
  }

  salvarAssunto() {
    if (this.cadastroAssuntoFormGroup.valid ) {
      this.exibirSpinner = true
      let assunto: Assunto = this.mapperForm2Questao();
      this.assuntoService.salvar(assunto)
        .pipe(
          finalize(() => {
            this.exibirSpinner = false
          })
        )
        .subscribe({
          next: assuntoResponse => {
            this.mapperQuestao2Form(assuntoResponse)
            this.cadastroAssuntoFormGroup.reset();
            this.formGroupDirective.resetForm();
            this.openSnackBar("Assunto cadastrado! ", "X")
          },
          error: error => {
            this.formGroupDirective.resetForm();
            this.openSnackBar("Erro ao salvar o assunto. ", "X")
          }
        });
    }
  }

  carregarDisciplinas() {
    this.exibirSpinner = true;
    this.disciplinaService.obterDisciplinas().subscribe({
      next: (data) => {
        this.disciplinas = data;
        this.exibirSpinner = false;
      },
      error: (error) => {
        this.openSnackBar('Error ao tentar obter dados de disciplinas.', 'x');
      },
    });
  }

  getErrorAssunto() {
    return this.cadastroAssuntoFormGroup.get('descricao').hasError('required')
      ? 'Campo obrigatório'
      : '';
  }

  voltaraoMenuCadastro() {
    this.router.navigate([RotasApp.CADASTRO]);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }
}
