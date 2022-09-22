import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetMovieRentById {
    async execute(req: Request) {
        const { idRelacao } = req.query
        const rent = await prisma.movieRent.findUnique({
            where: {
                idRelacao: Number(idRelacao)
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    },
                },
                movie: {
                    select: {
                        id: true,
                        titulo: true,
                        genero: true,
                        imagem: true
                    },
                }
            }
        })
        if (rent == null) {
            throw new AppError(`Relação com o ID ${idRelacao} não foi encontrada`, 404)
        }

        return rent
    }
}