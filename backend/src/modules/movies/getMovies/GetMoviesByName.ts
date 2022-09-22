import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetMoviesByName {
    async execute(req: Request, res: Response) {
        const { titulo } = req.query
        const movies = await prisma.movies.findMany({
            where: {
                titulo: {
                    contains: String(titulo)
                }
            },
            orderBy: {
                titulo: "asc"
            }
        })

        if (movies.length == 0) {
            throw new AppError(`Nenhum filme com nome ${titulo} foi encontrado.`, 404)
        }
        return movies
    }
}