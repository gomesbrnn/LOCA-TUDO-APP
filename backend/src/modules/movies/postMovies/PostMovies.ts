import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";


export class PostMovies {
    async execute(req: Request) {
        const image = req.file?.filename;
       
        const { titulo, anoLancamento, sinopse, genero, duracao, preco } = req.body
        const movie = await prisma.movies.create({
            data: {
                titulo: String(titulo),
                anoLancamento: Number(anoLancamento),
                sinopse: String(sinopse),
                genero: String(genero),
                duracao: Number(duracao),
                preco: Number(preco),
                imagem: String(image),
            }
        })
        console.log(req.file);

        return movie;
    }
}

