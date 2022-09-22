import { Movies, Prisma } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetAllMovies {
    async execute(): Promise<Movies[]> {
        const movies = await prisma.movies.findMany({
            orderBy: {
                titulo: "asc"
            },
        })

        if (movies.length == 0) {
            throw new AppError('Nenhum filme cadastrado no banco de dados', 404)
        }
        return movies;
    }
}