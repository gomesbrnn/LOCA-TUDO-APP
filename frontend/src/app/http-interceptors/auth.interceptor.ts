import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { UsuarioService } from 'src/service/usuario.service';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService) { }


  intercept(req: HttpRequest<unknown>, next: HttpHandler) {

    const token = this.usuarioService.getAuthToken();
    let request: HttpRequest<any> = req;

    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }

    return next.handle(request)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro', error.error.message);
    }
    else {
      console.error(
        `Código do erro: ${error.status}`, +
      `Erro: ${JSON.stringify(error.error)}`
      );
    }

    return throwError('Ocorreu um erro, teste novamente');
  }

}
