import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/model/Filme';
import { FilmeService } from 'src/service/filme.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar',
  templateUrl: './listar-filmes.component.html',
  styleUrls: ['./listar-filmes.component.css']
})
export class ListarFilmeComponent implements OnInit {

  constructor(
    private filmeService: FilmeService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public filmes: Filme[] = [];

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

  excluirFilme(id: number) {
    this.spinner.show();
    this.filmeService.deleteFIlm(id).subscribe(
      () => {
        this.toastr.success('Exclusão realizada com sucesso.');
        this.listarFilmes();
        this.spinner.hide();
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
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
