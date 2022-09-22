import { Filme } from "./Filme";
import { Usuario } from "./Usuario";


export interface Locacao {
    idRelacao: number;
    alugado_em: string;
    movieId: number;
    userId: number;
    user: Usuario;
    movie: Filme;
}