import { Component, OnInit, ViewChild } from '@angular/core';
import { Filme } from 'src/model/Filme';
import { FilmeService } from 'src/service/filme.service';
import { Locacao } from 'src/model/Locacao';
import { LocacaoService } from 'src/service/locacao.service';
import { Usuario } from 'src/model/Usuario';
import { UsuarioService } from 'src/service/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})

export class CatalogoComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;

  constructor(
    private filmeService: FilmeService,
    private locacaoService: LocacaoService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public filmes: Filme[] = [];
  public filme: Filme = {} as Filme;
  public locacao: Locacao = {} as Locacao;
  public usuario: Usuario = {} as Usuario;

  /* ------------------------------------------- Post de Locação ------------------------------------------ */

  postLocacao = this.formBuilder.group({
    movieId: [0, Validators.required],
    userId: [0, Validators.required],
    preco: [0, Validators.required],
    movie: [{}, Validators.required]
  })

  public get movieId() {
    return this.postLocacao.get('movieId')!;
  }

  public get userId() {
    return this.postLocacao.get('userId')!;
  }

  public get movie() {
    return this.postLocacao.get('movie')!;
  }

  public get preco() {
    return this.postLocacao.get('preco')!;
  }

  getFilmId(id: number) {
    this.spinner.show();
    this.filmeService.getFIlmId(id).subscribe(
      filme => {
        this.filme = { ...filme };
        this.postLocacao.patchValue({
          movieId: this.filme.id,
          userId: this.usuarioService.getAuthId(),
          preco: this.filme.preco,
          movie: this.filme.titulo
        })
        this.spinner.hide();
        console.log(this.postLocacao.value)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  addLocacao() {
    if (this.postLocacao.invalid) {
      return
    }

    this.locacao = { ...this.postLocacao.value } as Locacao
    this.spinner.show();
    this.locacaoService.postLocacao(this.locacao).subscribe(
      (result) => {
        this.closebutton.nativeElement.click();
        this.router.navigate(['/locacoes-user', this.usuarioService.getAuthIdStr()]);
        this.spinner.hide();
        this.toastr.success('Locação realizada com sucesso.');
        console.log(result)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  /* ---------------------------------------- Listagem de filmes ---------------------------------------- */

  listarFilmes() {
    this.spinner.show();
    this.filmeService.getFilms().subscribe(
      filme => {
        this.filmes = filme;
        this.spinner.hide();
        console.log(this.filmes)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  public search(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.filmes = this.filmes.filter(
      filme => {
        return filme.titulo.toLowerCase().includes(value.toLowerCase());
      });

    if (value == '') this.listarFilmes()
  }

  p: number = 1;

  onActivate(event: Event) {

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }

  ngOnInit(): void {
    this.listarFilmes();
  }

}
