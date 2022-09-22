import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { Usuario } from 'src/model/Usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public usuario: Usuario = {} as Usuario;

  postUsuario = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required],
    senha: ['', Validators.required]
  })

  public get nome() {
    return this.postUsuario.get('nome')!;
  }

  public get email() {
    return this.postUsuario.get('email')!;
  }

  public get cpf() {
    return this.postUsuario.get('cpf')!;
  }

  public get senha() {
    return this.postUsuario.get('senha')!;
  }

  addUser() {
    if (this.postUsuario.invalid) {
      return
    }
    if (this.postUsuario.valid) {

      this.usuario = { ...this.postUsuario.value } as Usuario;
      this.spinner.show();
      this.usuarioService.postUser(this.usuario).subscribe(
        () => {
          console.log(this.usuario)
          this.router.navigate(['/login'])
          this.spinner.hide();
          this.toastr.success('Conta criado com sucesso, seja bem vindo!');
        },
        error => {
          this.spinner.hide();
          this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
          console.log(error)
        })
    }
  }

  ngOnInit(): void {
  }

}
