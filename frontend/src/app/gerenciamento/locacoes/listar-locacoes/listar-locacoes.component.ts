import { Component, OnInit } from '@angular/core';
import { Locacao } from 'src/model/Locacao';
import { LocacaoService } from 'src/service/locacao.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar-locacoes',
  templateUrl: './listar-locacoes.component.html',
  styleUrls: ['./listar-locacoes.component.css']
})
export class ListarLocacoesComponent implements OnInit {

  constructor(
    private locacaoService: LocacaoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public locacoes: Locacao[] = [];

  listarLocacoes() {
    this.spinner.show();
    this.locacaoService.getLocacoes().subscribe(
      locacoes => {
        this.locacoes = locacoes;
        this.spinner.hide();
        console.log(this.locacoes)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  deleteLocacao(id: number) {
    this.spinner.show()
    this.locacaoService.deleteLocacao(id).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('Exclusão realizada com sucesso.');
        this.listarLocacoes();
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
    this.listarLocacoes();
  }

}
