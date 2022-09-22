import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/model/Filme';
import { FilmeService } from 'src/service/filme.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar',
  templateUrl: './editar-filme.component.html',
  styleUrls: ['./editar-filme.component.css']
})
export class EditarFilmeComponent implements OnInit {

  constructor(
    private filmeService: FilmeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public filme: Filme = {} as Filme;
  public imagem: File | null = null;

  attFilme = this.fb.group({
    id: [0, Validators.required],
    titulo: ['', Validators.required],
    anoLancamento: [0, Validators.required],
    genero: ['', Validators.required],
    duracao: [0, Validators.required],
    sinopse: ['', Validators.required],
    preco: [0, Validators.required]
  })

  public get titulo() {
    return this.attFilme.get('titulo')!;
  }
  public get anoLancamento() {
    return this.attFilme.get('anoLancamento')!;
  }
  public get genero() {
    return this.attFilme.get('genero')!;
  }
  public get duracao() {
    return this.attFilme.get('duracao')!;
  }
  public get sinopse() {
    return this.attFilme.get('sinopse')!;
  }
  public get preco() {
    return this.attFilme.get('preco')!;
  }

  getFilmId() {
    this.spinner.show();
    this.filmeService.getFIlmId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      filme => {
        this.filme = { ...filme };
        this.attFilme.patchValue(this.filme)
        this.spinner.hide();
        console.log(this.attFilme.value)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.getFilmId();
  }

  fileChange(event: any) {
    if (event.target.files.length > 0) {
      this.imagem = event.target.files[0]
    }
  }

  updateFilm() {

    if (this.attFilme.invalid) {
      return
    }
    const formData = new FormData();

    if (this.imagem) {
      formData.append('imagem', this.imagem)
    }

    for (const key in this.attFilme.value) {
      formData.append(key, this.attFilme.get(key)?.value ?? '')
    }

    this.spinner.show();
    this.filmeService.patchFIlm(this.filme.id, formData).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Edição realizada com sucesso.');
        this.router.navigate(['/gerenciar-filmes'])
        console.log(this.filme)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

}
