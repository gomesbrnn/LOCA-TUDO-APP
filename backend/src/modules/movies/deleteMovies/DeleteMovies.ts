import {  Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";
import fs from 'fs';

export class DeleteMovies {
    async execute(req: Request) {
        const { id } = req.query
        const movieNotExist = await prisma.movies.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (!movieNotExist) {
            throw new AppError(`O filme com ID ${id} não foi encontrado`, 404)
        }

        const movie = await prisma.movies.delete({
            where: {
                id: Number(id)
            }
        })
        const result = (`O filme ${movie.titulo} com ID ${movie.id} foi deletado com sucesso`)

        console.log(movie.imagem);
        const fliePath = `./uploads/${movie.imagem}`


        fs.unlink(fliePath, function () {
        });


        return result
    }
}

