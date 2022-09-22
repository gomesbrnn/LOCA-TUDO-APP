import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/model/Usuario';
import { UsuarioService } from 'src/service/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, private router: Router) { }


  public usuario: Usuario = {} as Usuario

  public removeToken() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('role');
    this.router.navigate(['/login'])
  }

  ngOnInit(): void {
  }

}
