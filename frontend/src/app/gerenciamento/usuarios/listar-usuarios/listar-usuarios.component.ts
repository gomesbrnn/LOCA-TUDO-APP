import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'src/service/usuario.service';
import { Usuario } from 'src/model/Usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-listar',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public usuario: Usuario[] = [];

  listarUsuarios() {
    this.spinner.show();
    this.usuarioService.getUsers().subscribe(
      usuario => {
        this.usuario = usuario;
        this.spinner.hide();
        console.log(this.usuario)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  deleteUsuario(id: number) {
    this.spinner.show();
    this.usuarioService.deleteUser(id).subscribe(
      () => {
        this.listarUsuarios();
        this.spinner.hide();
        this.toastr.success('Exclusão realizada com sucesso.');
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
    this.listarUsuarios()
  }

}
