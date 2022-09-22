import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/service/usuario.service';
import { Usuario } from 'src/model/Usuario';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  public usuario: Usuario = {} as Usuario;

  patchUsuario = this.fb.group({
    id: [0, Validators.required],
    nome: ['', Validators.required],
    email: ['', Validators.required],
    cpf: ['', Validators.required]
  })

  public get nome() {
    return this.patchUsuario.get('nome')!;
  }

  public get email() {
    return this.patchUsuario.get('email')!;
  }

  public get cpf() {
    return this.patchUsuario.get('cpf')!;
  }

  getUserId() {
    this.spinner.show();
    this.usuarioService.getUserId(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      user => {
        this.usuario = { ...user };
        this.patchUsuario.patchValue(this.usuario)
        this.spinner.hide();
        console.log(this.usuario)
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  updateUser() {

    if (this.patchUsuario.invalid) {
      return
    }

    let usr: Usuario = { ... this.patchUsuario.value } as Usuario;
    this.spinner.show();
    this.usuarioService.patchUser(usr.id, usr).subscribe(
      user => {
        this.router.navigate(['/listar-usuarios'])
        this.spinner.hide();
        this.toastr.success('Edição realizada com sucesso.');
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Não foi possivel realizar a sua solicitação, tente novamente');
        console.log(error)
      })
  }

  ngOnInit(): void {
    this.getUserId()
  }

}
