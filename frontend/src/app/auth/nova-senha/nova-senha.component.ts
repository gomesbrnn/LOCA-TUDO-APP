import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { Usuario } from 'src/model/Usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public usuario: Usuario = {} as Usuario;

  resetPass = this.fb.group({
    email: ['', Validators.required],
    cpf: ['', Validators.required]
  })

  public get email() {
    return this.resetPass.get('email')!;
  }

  public get cpf() {
    return this.resetPass.get('cpf')!;
  }

  resetPw() {
    if (this.resetPass.invalid) {
      return
    }

    this.usuario = { ...this.resetPass.value } as Usuario;
    this.spinner.show()

    this.usuarioService.resetPass(this.usuario).subscribe(
      () => {
        this.router.navigate(['/login'])
        this.toastr.success('Senha alterada com sucesso, verifique seu e-mail!')
        this.spinner.hide()
        console.log(this.usuario)
      },
      error => {
        this.spinner.hide()
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
  }

}
