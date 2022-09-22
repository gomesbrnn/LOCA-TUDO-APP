



import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from 'ngx-toastr';
import { HttpInterceptorProviders } from './http-interceptors';


import { AppComponent } from './app.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ControleGeralComponent } from './gerenciamento/controle-geral/controle-geral.component';
import { CadastrarFilmeComponent } from './gerenciamento/filmes/cadastrar-filme/cadastrar-filme.component';
import { ListarFilmeComponent } from './gerenciamento/filmes/listar-filmes/listar-filmes.component';
import { ListarUsuariosComponent } from './gerenciamento/usuarios/listar-usuarios/listar-usuarios.component';
import { ListarLocacoesComponent } from './gerenciamento/locacoes/listar-locacoes/listar-locacoes.component';
import { EditarLocacaoComponent } from './gerenciamento/locacoes/editar-locacao/editar-locacao.component';
import { CriarLocacaoComponent } from './gerenciamento/locacoes/criar-locacao/criar-locacao.component';
import { EditarUsuarioComponent } from './gerenciamento/usuarios/editar-usuario/editar-usuario.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { CatalogoComponent } from './filmes/catalogo/catalogo.component';
import { UsuarioService } from 'src/service/usuario.service';
import { FilmeService } from 'src/service/filme.service';
import { EditarFilmeComponent } from './gerenciamento/filmes/editar-filme/editar-filme.component';
import { LocacoesComponent } from './locacoes/locacoes.component';
import { LocacaoService } from 'src/service/locacao.service';
import { VisualizarFilmeComponent } from './filmes/visualizar-filme/visualizar-filme.component';
import { ConteudoComponent } from './conteudo/conteudo.component';
import { NovaSenhaComponent } from './auth/nova-senha/nova-senha.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    ControleGeralComponent,
    CadastrarFilmeComponent,
    ListarFilmeComponent,
    EditarFilmeComponent,
    ListarUsuariosComponent,
    ListarLocacoesComponent,
    EditarLocacaoComponent,
    CriarLocacaoComponent,
    EditarUsuarioComponent,
    LoginComponent,
    RegistroComponent,
    CatalogoComponent,
    LocacoesComponent,
    VisualizarFilmeComponent,
    ConteudoComponent,
    NovaSenhaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    ToastrModule.forRoot()
  ],
  providers: [
    UsuarioService,
    FilmeService,
    LocacaoService,
    HttpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
