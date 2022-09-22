import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { Usuario } from 'src/model/Usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public usuario: Usuario = {} as Usuario;

  loginUsuario = this.fb.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  })

  public get email() {
    return this.loginUsuario.get('email')!;
  }

  public get senha() {
    return this.loginUsuario.get('senha')!;
  }

  async loginUser() {

    if (this.loginUsuario.invalid) {
      return
    }
    this.usuario = { ...this.loginUsuario.value } as Usuario;
    this.spinner.show();
    this.usuarioService.login(this.usuario).subscribe(
      (result) => {

        if (result && result.data.token) {
          window.localStorage.setItem('token', result.data.token)
          window.localStorage.setItem('id', result.data.id)
          window.localStorage.setItem('role', result.data.role)
        }

        this.spinner.hide();
        this.toastr.success(`Olá, seja bem vindo ao Loca Tudo!`);
        this.router.navigate(['/catalogo'])
        console.log(result)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error);
      })
  }

  ngOnInit(): void {
  }

}
