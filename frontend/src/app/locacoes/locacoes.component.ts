import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/Usuario';
import { UsuarioService } from 'src/service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-locacoes',
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.css']
})
export class LocacoesComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private usuarioService: UsuarioService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService) { }


  public usuario: Usuario = {} as Usuario;


  getUserId() {
    this.spinner.show();
    this.usuarioService.getUserId(this.actRoute.snapshot.paramMap.get('id')).subscribe(
      user => {
        this.usuario = { ...user }
        this.spinner.hide();
        console.log(this.usuario)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.getUserId();
  }

}
