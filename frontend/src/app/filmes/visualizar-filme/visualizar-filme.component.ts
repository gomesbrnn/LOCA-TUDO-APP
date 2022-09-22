import { Component, OnInit } from '@angular/core';
import { Filme } from 'src/model/Filme';
import { FilmeService } from 'src/service/filme.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.css']
})
export class VisualizarFilmeComponent implements OnInit {

  constructor(
    private filmeService: FilmeService,
    private actRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  public filme: Filme = {} as Filme;

  getFilmId() {
    this.spinner.show();
    this.filmeService.getFIlmId(this.actRoute.snapshot.paramMap.get('id')).subscribe(
      filme => {
        this.filme = { ...filme }
        this.spinner.hide();
        console.log(this.filme)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.getFilmId()
  }

}
