import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { Disciplina } from 'src/app/core/models/disciplina.model';
import { NivelQuestao } from 'src/app/core/models/nivelQuestao.model';
import { Questao } from 'src/app/core/models/questao.model';
import { Resposta } from 'src/app/core/models/resposta.model';
import { TipoQuestao } from 'src/app/core/models/tipoQuestao.model';
import { DisciplinaService } from 'src/app/core/services/disciplina.service';
import { NivelQuestaoService } from 'src/app/core/services/nivelQuestao.service';
import { QuestaoService } from 'src/app/core/services/questao.service';
import { TipoQuestaoService } from 'src/app/core/services/tipoQuestao.service';
import { RotasApp } from 'src/app/shared/enum/rotas-app';
import { finalize } from 'rxjs';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { PessoaDTO } from 'src/app/core/models/pessoaDTO.model';
import { Assunto } from 'src/app/core/models/assunto.model';
import { AssuntoService } from 'src/app/core/services/assunto.service';

@Component({
  selector: 'app-questao',
  templateUrl: './questao.component.html',
  styleUrls: ['./questao.component.scss'],
})
export class QuestaoComponent implements OnInit, AfterViewChecked {
  cadastroQuestaoFormGroup: FormGroup;
  respostasFormGroup: FormGroup
  tipoQuestaoFormGroup: FormGroup
  nivelQuestaoFormGroup: FormGroup
  disciplinaFormGroup: FormGroup
  uploadArquivoFormGroup: FormGroup;
  assuntoFormGroup: FormGroup;
  exibirSpinner: boolean = false;
  disciplinas: Disciplina[];
  niveis: NivelQuestao[];
  tipos: TipoQuestao[];
  assuntos: Assunto[];
  questao: Questao;
  items: FormArray;
  mensagemTipoQuestao: string;
  habilitaOpcoes: boolean = false;
  habilita3Opcoes: boolean = false;
  habilita4Opcoes: boolean = false;
  habilita5Opcoes: boolean = false;
  exibirOpcoes: boolean = false;
  pessoa: PessoaDTO;

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  @ViewChild(MatTable) table: MatTable<Questao>;

  constructor(
    private formBuilder: FormBuilder,
    private disciplinaService: DisciplinaService,
    private tipoQuestaoService: TipoQuestaoService,
    private nivelQuestaoService: NivelQuestaoService,
    private questaoService: QuestaoService,
    private assuntoService: AssuntoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private cd: ChangeDetectorRef,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.carregarDisciplinas();
    this.carregarNiveisQuestoes();
    this.carregarTiposQuestoes();
    this.pessoa = this.authService.getCurrentUser;
  }

  ngAfterViewChecked(): void {
    this.cd.detectChanges();
  }

  chooseQuestionType(event: any) {
    if (event.isUserInput) {
      if (event.source.value.id == 4) {
        this.mensagemTipoQuestao = 'Quantas opções?';
        this.habilitaOpcoes = true;
      }
      if (event.source.value.id == 5 || event.source.value.id == 6) {
        this.resetRespostas();
        this.desabilitaOpcoes();
      }
    }
  }

  desabilitaOpcoes() {
    this.habilitaOpcoes = false;
    this.habilita3Opcoes = false;
    this.habilita4Opcoes = false;
    this.habilita5Opcoes = false;
    this.exibirOpcoes = false;
  }

  resetRespostas() {
    this.respostasFormGroup.reset()
  }

  getNumRespostas(event: MatRadioChange) {
    this.exibirOpcoes = true;
    if (event.value == 7) {
      this.habilita3Opcoes = true;
      this.habilita4Opcoes = false;
      this.habilita5Opcoes = false;
    }

    if (event.value == 8) {
      this.habilita3Opcoes = true;
      this.habilita4Opcoes = true;
      this.habilita5Opcoes = false;
    }
    if (event.value == 9) {
      this.habilita3Opcoes = true;
      this.habilita4Opcoes = true;
      this.habilita5Opcoes = true;
    }
  }

  voltaraoMenuCadastro() {
    this.router.navigate([RotasApp.CADASTRO]);
  }

  private createForm() {
    this.cadastroQuestaoFormGroup = this.formBuilder.group({
      codigo: ['', Validators.required],
      descricao: ['', [Validators.required]],
      banca: '',
      id: null,
      ativo: null,
    });
    this.uploadArquivoFormGroup = this.formBuilder.group({
      items: this.formBuilder.array([this.criarNovoUploadArquivo()])
    });
    this.tipoQuestaoFormGroup = this.formBuilder.group({
      tipoQuestao: ['', [Validators.required]],
    });
    this.nivelQuestaoFormGroup = this.formBuilder.group({
      nivelQuestao: ['', [Validators.required]],
    });
    this.disciplinaFormGroup = this.formBuilder.group({
      disciplina: ['', [Validators.required]],
    });
    this.assuntoFormGroup = this.formBuilder.group({
      assunto: ['', [Validators.required]],
    });
    this.respostasFormGroup = this.formBuilder.group({
      opcao1: '',
      opcao2: '',
      opcao3: '',
      opcao4: '',
      opcao5: '',
    });
  }

  private criarNovoUploadArquivo(): FormGroup {
    return this.formBuilder.group({
      nomeArquivo: '',
      id: '',
      file: null
    });
  }

  removeArquivo(i: number) {
    this.items.at(i).get('file').setValue(undefined);
    this.items.at(i).get('nomeArquivo').setValue(undefined)
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

  selectAssuntoByDisciplina(disciplina: Disciplina) {
    this.exibirSpinner = true;
    this.assuntoService.obterAssuntoByDisciplina(disciplina).subscribe({
      next: (data) => {
        this.assuntos = data;
        this.exibirSpinner = false;
      },
      error: (error) => {
        this.openSnackBar('Error ao tentar obter dados de disciplinas.', 'x');
      },
    });

  }

  carregarNiveisQuestoes() {
    this.exibirSpinner = true;
    this.nivelQuestaoService.obterNiveisQuestoes().subscribe({
      next: (data) => {
        this.niveis = data;
        this.exibirSpinner = false;
      },
      error: (error) => {
        this.openSnackBar('Error ao tentar obter os níveis de questões.', 'x');
      },
    });
  }

  carregarTiposQuestoes() {
    this.exibirSpinner = true;
    this.tipoQuestaoService.obterTiposQuestoes().subscribe({
      next: (data) => {
        this.tipos = data;
        this.exibirSpinner = false;
      },
      error: (error) => {
        this.openSnackBar('Error ao tentar obter os tipos de questões.', 'x');
      },
    });
  }

  onFileChange(event: any, i: number) {
    this.items = this.uploadArquivoFormGroup.get('items') as FormArray;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.items.at(i).get('file').setValue(file);
      this.items.at(i).get('nomeArquivo').setValue(file.name)
      this.cd.markForCheck();
    }
  }

  get cadastroQuestaoFormGroupGB() {
    return this.uploadArquivoFormGroup.get('items') as FormArray;
  }

  private openSnackBar(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 5 * 1000,
    });
  }

  getRespostas(): Resposta {
    let resp = new Resposta;
    if (this.respostasFormGroup.get('opcao1').value != null) {
      resp.opcao1 = this.respostasFormGroup.get('opcao1').value;
    }
    if (this.respostasFormGroup.get('opcao2').value !== null) {
      resp.opcao2 = this.respostasFormGroup.get('opcao2').value;
    }
    if (this.respostasFormGroup.get('opcao3').value !== null) {
      resp.opcao3 = this.respostasFormGroup.get('opcao3').value;
    }
    if (this.respostasFormGroup.get('opcao4').value !== null) {
      resp.opcao4 = this.respostasFormGroup.get('opcao4').value;
    }
    if (this.respostasFormGroup.get('opcao5').value !== null) {
      resp.opcao5 = this.respostasFormGroup.get('opcao5').value;
    }
    return resp;
  }

  private mapperForm2Questao(): Questao {
    let questao: Questao = new Questao();
    let resposta: Resposta = new  Resposta();
    resposta = this.getRespostas();
    Object.assign(questao, this.cadastroQuestaoFormGroup.value);
    Object.assign(questao, this.disciplinaFormGroup.value);
    Object.assign(questao, this.nivelQuestaoFormGroup.value);
    Object.assign(questao, this.tipoQuestaoFormGroup.value);
    Object.assign(questao, this.assuntoFormGroup.value);
    questao.respostas = resposta;
    questao.pessoa = this.pessoa;
    return questao;
  }

  private mapperQuestao2Form(questaoResponse: Questao) {
    this.items = this.uploadArquivoFormGroup.get('items') as FormArray;
    this.cadastroQuestaoFormGroup.patchValue(questaoResponse);
    this.disciplinaFormGroup.get('disciplina').patchValue(questaoResponse.disciplina);
    this.nivelQuestaoFormGroup.get('nivelQuestao').patchValue(questaoResponse.nivelQuestao);
    this.tipoQuestaoFormGroup.get('tipoQuestao').patchValue(questaoResponse.tipoQuestao);
    this.assuntoFormGroup.get('assunto').patchValue(questaoResponse.assunto);
  }

  salvarQuestao() {
    if (this.cadastroQuestaoFormGroup.valid &&
      this.disciplinaFormGroup.valid &&
      this.tipoQuestaoFormGroup.valid &&
      this.nivelQuestaoFormGroup.valid &&
      this.assuntoFormGroup.valid) {
      this.exibirSpinner = true
      let questao: Questao = this.mapperForm2Questao();
      this.questaoService.salvar(questao)
        .pipe(
          finalize(() => {
            this.exibirSpinner = false
          })
        )
        .subscribe({
          next: questaoResponse => {
            this.mapperQuestao2Form(questaoResponse)
            this.nivelQuestaoFormGroup.reset();
            this.formGroupDirective.resetForm();
            this.desabilitaOpcoes();
            this.resetRespostas();
            this.openSnackBar("Questão cadastrada! ", "X")
          },
          error: error => {
            this.formGroupDirective.resetForm();
            this.openSnackBar("Erro ao salvar a questão. ", "X")
          }
        });
    }
  }

  getErrorCodigo() {
    return this.cadastroQuestaoFormGroup.get('codigo').hasError('required')
      ? 'Campo obrigatório'
      : '';
  }

  getErrorDescricao() {
    return this.cadastroQuestaoFormGroup.get('descricao').hasError('required')
      ? 'Campo obrigatório'
      : '';
  }

}
