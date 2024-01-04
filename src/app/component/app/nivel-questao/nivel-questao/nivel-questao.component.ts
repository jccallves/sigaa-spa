import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NivelQuestao } from 'src/app/core/models/nivelQuestao.model';
import { NivelQuestaoService } from 'src/app/core/services/nivelQuestao.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { RotasApp } from 'src/app/shared/enum/rotas-app';

@Component({
  selector: 'app-nivel-questao',
  templateUrl: './nivel-questao.component.html',
  styleUrls: ['./nivel-questao.component.scss']
})
export class NivelQuestaoComponent implements OnInit {

  cadastroNivelQuestaoFormGroup: FormGroup;
  exibirSpinner: boolean = false;
  nivelQuestao: NivelQuestao;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private nivelQuestaoService: NivelQuestaoService,
    private router: Router) {

    }

  ngOnInit(): void {
    this.createForm();
  }

  voltaraoMenuCadastro() {
    this.router.navigate([RotasApp.CADASTRO]);
  }

  private createForm() {
    this.cadastroNivelQuestaoFormGroup = this._formBuilder.group({
      descricao: ['', Validators.required],
      id: null,
      ativo: null,
    });
  }

  salvarNivelQuestao() {
    if (this.cadastroNivelQuestaoFormGroup.valid ) {

      this.exibirSpinner = true
      let nivelQuestao: NivelQuestao = this.mapperForm2NivelQuestao();
      this.nivelQuestaoService.salvar(nivelQuestao)
    .pipe(
      finalize(() => {
        this.exibirSpinner = false

      })
    )
    .subscribe({
      next: nivelQuestaoResponse => {
        this.mapperNivelQuestao2Form(nivelQuestaoResponse)
        this.formGroupDirective.resetForm();
          this.openSnackBar("Tipo de questão cadastrada com sucesso.", "X")
      },
      error: error => {
        this.openSnackBar("Erro ao cadastrar o tipo de uma questão", "X")
      }
    });
}
  }

  private mapperForm2NivelQuestao() {
    let nivelQuestao: NivelQuestao = new NivelQuestao();
    Object.assign(nivelQuestao, this.cadastroNivelQuestaoFormGroup.value);
    return nivelQuestao;
  }

  private mapperNivelQuestao2Form(nivelQuestaoResponse: NivelQuestao) {
    this.nivelQuestao = nivelQuestaoResponse;
    this.cadastroNivelQuestaoFormGroup.patchValue(nivelQuestaoResponse);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000
    });
  }

  getErrorDescricao() {
    return this.cadastroNivelQuestaoFormGroup.get('descricao').hasError('required') ? 'Campo obrigatório' : '';
  }

}
