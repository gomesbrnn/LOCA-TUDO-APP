import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filme } from 'src/model/Filme';
import { FilmeService } from 'src/service/filme.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar-filme.component.html',
  styleUrls: ['./cadastrar-filme.component.css']
})
export class CadastrarFilmeComponent implements OnInit {

  constructor(
    private filmeService: FilmeService,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public filme: Filme = {} as Filme;
  public imagem: File | null = null;

  postFilme = this.fb.group({
    titulo: ['', Validators.required],
    anoLancamento: [0, Validators.required],
    genero: ['', Validators.required],
    duracao: [0, Validators.required],
    sinopse: ['', Validators.required],
    preco: [0, Validators.required]
  })

  public get titulo() {
    return this.postFilme.get('titulo')!;
  }
  public get anoLancamento() {
    return this.postFilme.get('anoLancamento')!;
  }
  public get genero() {
    return this.postFilme.get('genero')!;
  }
  public get duracao() {
    return this.postFilme.get('duracao')!;
  }
  public get sinopse() {
    return this.postFilme.get('sinopse')!;
  }
  public get preco() {
    return this.postFilme.get('preco')!;
  }

  fileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imagem = event.target.files[0]
    }
  }

  postFilm() {

    if (this.postFilme.invalid) {
      return
    }
    const formData = new FormData();

    if (this.imagem) {
      formData.append('imagem', this.imagem)
    }

    for (const key in this.postFilme.value) {
      formData.append(key, this.postFilme.get(key)?.value ?? '')
    }
    this.spinner.show();
    this.filmeService.postFilm(formData).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Criação realizada com sucesso.');
        this.router.navigate(['/gerenciar-filmes'])
        console.log(this.filme.imagem)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
  }

}
