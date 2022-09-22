import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/service/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NovaSenhaComponent } from './auth/nova-senha/nova-senha.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { CatalogoComponent } from './filmes/catalogo/catalogo.component';
import { VisualizarFilmeComponent } from './filmes/visualizar-filme/visualizar-filme.component';
import { ControleGeralComponent } from './gerenciamento/controle-geral/controle-geral.component';
import { CadastrarFilmeComponent } from './gerenciamento/filmes/cadastrar-filme/cadastrar-filme.component';
import { EditarFilmeComponent } from './gerenciamento/filmes/editar-filme/editar-filme.component';
import { ListarFilmeComponent } from './gerenciamento/filmes/listar-filmes/listar-filmes.component';
import { EditarLocacaoComponent } from './gerenciamento/locacoes/editar-locacao/editar-locacao.component';
import { ListarLocacoesComponent } from './gerenciamento/locacoes/listar-locacoes/listar-locacoes.component';
import { EditarUsuarioComponent } from './gerenciamento/usuarios/editar-usuario/editar-usuario.component';
import { ListarUsuariosComponent } from './gerenciamento/usuarios/listar-usuarios/listar-usuarios.component';
import { HomeComponent } from './layout/home/home.component';
import { LocacoesComponent } from './locacoes/locacoes.component';

const routes: Routes = [

  {
    /* ------------------------- User Navigation ---------------------- */
    path: '', component: ConteudoComponent,
    children: [
      { path: 'catalogo', component: CatalogoComponent },
      { path: 'locacoes-user/:id', component: LocacoesComponent },
      { path: 'visualizar-filme/:id', component: VisualizarFilmeComponent },

      /* --------------------- Gerenciamento ----------------------*/

      { path: 'gerenciamento', component: ControleGeralComponent },
      { path: 'gerenciar-filmes', component: ListarFilmeComponent },
      { path: 'cadastrar-filme', component: CadastrarFilmeComponent },
      { path: 'editar-filme/:id', component: EditarFilmeComponent },

      { path: 'gerenciar-locacoes', component: ListarLocacoesComponent },
      { path: 'editar-locacao/:id', component: EditarLocacaoComponent },

      { path: 'listar-usuarios', component: ListarUsuariosComponent },
      { path: 'editar-usuario/:id', component: EditarUsuarioComponent }
    ],
    canActivate: [AuthGuard]
  },

  /* ------------------------------ Rotas Liberadas ---------------------------------------- */

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar senha', component: NovaSenhaComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
