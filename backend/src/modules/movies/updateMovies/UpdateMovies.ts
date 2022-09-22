import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";
import fs from 'fs';

export class UpdateMovies {
    async execute(req: Request) {
        const { id } = req.query
        const MovieNotExist = await prisma.movies.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!MovieNotExist) {
            throw new AppError(`O filme com ID ${id} não foi encontrado`, 404)
        }




        const image = req.file?.filename;
        const { titulo, anoLancamento, sinopse, genero, duracao, preco } = req.body
        if (req.file == null) {
            const imagem = MovieNotExist.imagem
            const movie = await prisma.movies.update({
                data: {
                    titulo: String(titulo),
                    anoLancamento: Number(anoLancamento),
                    sinopse: String(sinopse),
                    genero: String(genero),
                    duracao: Number(duracao),
                    preco: Number(preco),
                    imagem: String(imagem)
                },
                where: {
                    id: Number(id)
                }
            })
            return movie

        } else {

            const fliePath = `./uploads/${MovieNotExist.imagem}`

            fs.unlink(fliePath, function () {
            });

            const movie = await prisma.movies.update({
                data: {
                    titulo: String(titulo),
                    anoLancamento: Number(anoLancamento),
                    sinopse: String(sinopse),
                    genero: String(genero),
                    duracao: Number(duracao),
                    preco: Number(preco),
                    imagem: String(image)
                },
                where: {
                    id: Number(id)
                }
            })

            console.log(req.file);

            return movie
        }
    }
}