import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from 'src/model/Filme';


const baseUrl = 'http://localhost:3000/movies';

@Injectable({
  providedIn: 'root'
})

export class FilmeService {

  constructor(private http: HttpClient) { }

  getFilms(): Observable<Filme[]> {
    return this.http.get<Filme[]>(`${baseUrl}/all`)
  }

  getFIlmId(id: any): Observable<Filme> {
    return this.http.get<Filme>(`${baseUrl}/id/?id=${id}`)
  }

  getFIlmName(name: string): Observable<Filme> {
    return this.http.get<Filme>(`${baseUrl}/name/?titulo=${name}`)
  }

  getFIlmGender(gender: any): Observable<Filme> {
    return this.http.get<Filme>(`${baseUrl}/gender/?genero=${gender}`)
  }

  postFilm(film: FormData): Observable<Filme> {
    return this.http.post<Filme>(`${baseUrl}`, film)
  }

  patchFIlm(id: number, film: FormData): Observable<Filme> {
    return this.http.patch<Filme>(`${baseUrl}/update/?id=${id}`, film)
  }

  deleteFIlm(id: number): Observable<Filme> {
    return this.http.delete<Filme>(`${baseUrl}/delete/?id=${id}`)
  }

}
