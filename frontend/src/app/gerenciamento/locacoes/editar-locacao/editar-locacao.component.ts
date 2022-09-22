import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Locacao } from 'src/model/Locacao';
import { LocacaoService } from 'src/service/locacao.service';
import { Filme } from 'src/model/Filme';
import { FilmeService } from 'src/service/filme.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-locacao',
  templateUrl: './editar-locacao.component.html',
  styleUrls: ['./editar-locacao.component.css']
})
export class EditarLocacaoComponent implements OnInit {

  constructor(
    private locacaoService: LocacaoService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filmeService: FilmeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  public locacao: Locacao = {} as Locacao;
  public filme: Filme[] = [];

  patchLocacao = this.fb.group({
    idRelacao: [0, Validators.required],
    movieId: [0, Validators.required],
    userId: [0, Validators.required],
    alugado_em: ['', Validators.required],
    user: [{}, Validators.required]
  })

  public get user() {
    return this.patchLocacao.get('user')!;
  }
  public get movieId() {
    return this.patchLocacao.get('movieId')!;
  }
  public get alugado_em() {
    return this.patchLocacao.get('alugado_em')!;
  }

  getFilmes() {
    this.spinner.show();
    this.filmeService.getFilms().subscribe(
      filme => {
        this.filme = filme;
        this.spinner.hide();
        console.log(this.filme)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  getLocacaoId() {
    this.spinner.show();
    this.locacaoService.getLocacaoId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      loc => {
        this.locacao = { ...loc };
        this.patchLocacao.patchValue(this.locacao);
        this.patchLocacao.patchValue({
          user: this.locacao.user.email,
        });
        this.spinner.hide();
        console.log(this.locacao)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  updateLocacao() {

    if (this.patchLocacao.invalid) {
      return
    }

    let locacao: Locacao = { ... this.patchLocacao.value } as Locacao;
    this.spinner.show();
    this.locacaoService.patchLocacao(locacao.idRelacao, locacao).subscribe(
      () => {
        this.router.navigate(['/gerenciar-locacoes'])
        this.spinner.hide();
        this.toastr.success('Edição realizada com sucesso.');
        console.log(locacao)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.getLocacaoId();
    this.getFilmes();
  }

}
