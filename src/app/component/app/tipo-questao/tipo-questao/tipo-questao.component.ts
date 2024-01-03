import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoQuestao } from 'src/app/core/models/tipoQuestao.model';
import { TipoQuestaoService } from 'src/app/core/services/tipoQuestao.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tipo-questao',
  templateUrl: './tipo-questao.component.html',
  styleUrls: ['./tipo-questao.component.scss']
})
export class TipoQuestaoComponent implements OnInit {

  cadastroTipoQuestaoFormGroup: FormGroup;
  exibirSpinner: boolean = false;
  tipoQuestao: TipoQuestao;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private tipoQuestaoService: TipoQuestaoService) {

    }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.cadastroTipoQuestaoFormGroup = this._formBuilder.group({
      descricao: ['', Validators.required],
      id: null,
      ativo: null,
    });
  }

  salvarTipoQuestao() {
    if (this.cadastroTipoQuestaoFormGroup.valid ) {

      this.exibirSpinner = true
      let tipoQuestao: TipoQuestao = this.mapperForm2TipoQuestao();
      this.tipoQuestaoService.salvar(tipoQuestao)
    .pipe(
      finalize(() => {
        this.exibirSpinner = false

      })
    )
    .subscribe({
      next: tipoQuestaoResponse => {
        this.mapperTipoQuestao2Form(tipoQuestaoResponse)
        this.formGroupDirective.resetForm();
          this.openSnackBar("Tipo de questão cadastrada com sucesso.", "X")
      },
      error: error => {
        this.openSnackBar("Erro ao cadastrar o tipo de uma questão", "X")
      }
    });
}
  }

  private mapperForm2TipoQuestao() {
    let tipoQuestao: TipoQuestao = new TipoQuestao();
    Object.assign(tipoQuestao, this.cadastroTipoQuestaoFormGroup.value);
    return tipoQuestao;
  }

  private mapperTipoQuestao2Form(tipoQuestaoResponse: TipoQuestao) {
    this.tipoQuestao = tipoQuestaoResponse;
    this.cadastroTipoQuestaoFormGroup.patchValue(tipoQuestaoResponse);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000
    });
  }

  getErrorDescricao() {
    return this.cadastroTipoQuestaoFormGroup.get('descricao').hasError('required') ? 'Campo obrigatório' : '';
  }
}
