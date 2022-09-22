import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Locacao } from 'src/model/Locacao';

const baseUrl = 'http://localhost:3000/rent';

@Injectable({
    providedIn: 'root'
})

export class LocacaoService {

    constructor(private http: HttpClient) { }

    getLocacoes(): Observable<Locacao[]> {
        return this.http.get<Locacao[]>(`${baseUrl}/all`)
    }

    getLocacaoId(id: any): Observable<Locacao> {
        return this.http.get<Locacao>(`${baseUrl}/id/?idRelacao=${id}`)
    }

    postLocacao(locacao: Locacao): Observable<Locacao> {
        return this.http.post<Locacao>(`${baseUrl}`, locacao)
    }

    patchLocacao(id: number, locacao: Locacao): Observable<Locacao> {
        return this.http.patch<Locacao>(`${baseUrl}/update/?idRelacao=${id}`, locacao)
    }

    deleteLocacao(id: number): Observable<Locacao> {
        return this.http.delete<Locacao>(`${baseUrl}/delete/?idRelacao=${id}`)
    }

}