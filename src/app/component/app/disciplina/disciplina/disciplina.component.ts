import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Disciplina } from 'src/app/core/models/disciplina.model';
import { finalize } from 'rxjs/operators';
import { DisciplinaService } from 'src/app/core/services/disciplina.service';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.scss']
})
export class DisciplinaComponent implements OnInit {

  cadastroDisciplinaFormGroup: FormGroup;
  disciplina: Disciplina;
  exibirSpinner: boolean = false;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private disciplinaService: DisciplinaService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  salvarDisciplina() {
    if (this.cadastroDisciplinaFormGroup.valid ) {

          this.exibirSpinner = true
          let disciplina: Disciplina = this.mapperForm2Disciplina();
          this.disciplinaService.salvar(disciplina)
        .pipe(
          finalize(() => {
            this.exibirSpinner = false

          })
        )
        .subscribe({
          next: disciplinaResponse => {
            this.mapperDisciplina2Form(disciplinaResponse)
            this.formGroupDirective.resetForm();
              this.openSnackBar("Disciplina cadastrada com sucesso.", "X")
          },
          error: error => {
            this.openSnackBar("Erro ao cadastrar a disciplina.", "X")
          }
        });
    }
  }

  private createForm() {
    this.cadastroDisciplinaFormGroup = this._formBuilder.group({
      descricao: ['', Validators.required],
      codigo: ['', Validators.required],
      id: null,
      ativo: null,
    });
  }

  private mapperForm2Disciplina() {
    let disciplina: Disciplina = new Disciplina();
    Object.assign(disciplina, this.cadastroDisciplinaFormGroup.value);
    return disciplina;
  }

  private mapperDisciplina2Form(disciplinaResponse: Disciplina) {
    this.disciplina = disciplinaResponse;
    this.cadastroDisciplinaFormGroup.patchValue(disciplinaResponse);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000
    });
  }

  getErrorNome() {
    return this.cadastroDisciplinaFormGroup.get('descricao').hasError('required') ? 'Campo obrigatório' : '';
  }

  getErrorCodigo() {
    return this.cadastroDisciplinaFormGroup.get('codigo').hasError('required') ? 'Campo obrigatório' : '';
  }

}
