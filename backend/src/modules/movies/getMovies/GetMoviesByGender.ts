import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetMoviesByGender {
    async execute(req: Request, res: Response) {
        const { genero } = req.query
        const movie = await prisma.movies.findMany({
            where: {
                genero: {
                    contains: String(genero)
                }
            },
            orderBy: {
                titulo: "asc"
            }
        })
        if (movie.length == 0) {
            throw new AppError(`Nenhum filme do genero ${genero} foi encontrado.`, 404)
        }

        return movie
    }
}