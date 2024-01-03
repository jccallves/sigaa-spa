import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoAvaliacao } from 'src/app/core/models/tipoAvaliacao.model';
import { finalize } from 'rxjs';
import { TipoAvaliacaoService } from 'src/app/core/services/tipoAvaliacao.service';

@Component({
  selector: 'app-tipo-avaliacao',
  templateUrl: './tipo-avaliacao.component.html',
  styleUrls: ['./tipo-avaliacao.component.scss']
})
export class TipoAvaliacaoComponent implements OnInit {

  cadastroTipoAvaliacaoFormGroup: FormGroup;
  exibirSpinner: boolean = false;
  tipoAvaliacao: TipoAvaliacao;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private tipoAvaliacaoService: TipoAvaliacaoService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.cadastroTipoAvaliacaoFormGroup = this._formBuilder.group({
      tipo: ['', Validators.required],
      id: null,
      ativo: null,
    });
  }

  salvarTipoAvaliacao() {
    if (this.cadastroTipoAvaliacaoFormGroup.valid ) {

      this.exibirSpinner = true
      let tipoAvaliacao: TipoAvaliacao = this.mapperForm2TipoAvaliacao();
      this.tipoAvaliacaoService.salvar(tipoAvaliacao)
    .pipe(
      finalize(() => {
        this.exibirSpinner = false

      })
    )
    .subscribe({
      next: tipoAvaliacaoResponse => {
        this.mapperTipoAvaliacao2Form(tipoAvaliacaoResponse)
        this.formGroupDirective.resetForm();
          this.openSnackBar("Tipo de avaliação cadastrada com sucesso.", "X")
      },
      error: error => {
        this.openSnackBar("Erro ao cadastrar o tipo de uma avaliação", "X")
      }
    });
}
  }

  private mapperForm2TipoAvaliacao() {
    let tipoAvaliacao: TipoAvaliacao = new TipoAvaliacao();
    Object.assign(tipoAvaliacao, this.cadastroTipoAvaliacaoFormGroup.value);
    return tipoAvaliacao;
  }

  private mapperTipoAvaliacao2Form(tipoAvaliacaoResponse: TipoAvaliacao) {
    this.tipoAvaliacao = tipoAvaliacaoResponse;
    this.cadastroTipoAvaliacaoFormGroup.patchValue(tipoAvaliacaoResponse);
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000
    });
  }

  getErrorTipo() {
    return this.cadastroTipoAvaliacaoFormGroup.get('tipo').hasError('required') ? 'Campo obrigatório' : '';
  }
}
