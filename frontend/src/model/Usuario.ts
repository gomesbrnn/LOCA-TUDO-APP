import { Filme } from "./Filme";
import { Locacao } from "./Locacao";

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    cpf: string;
    roleId: number;
    token: string;
    movie_rent: Locacao[];
}