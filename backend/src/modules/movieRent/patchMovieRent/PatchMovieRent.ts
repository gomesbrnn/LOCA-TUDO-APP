import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class PatchMovieRents {
    async execute(req: Request) {
        const { idRelacao } = req.query;
        const { movieId, userId } = req.body;
        try {
            const movieRentUpdated = await prisma.movieRent.update({
                data: {
                    movieId: Number(movieId),
                    userId: Number(userId),
                },
                where: {
                    idRelacao: Number(idRelacao)
                },
                select: {
                    alugado_em: true,
                    idRelacao: true,
                    movie: {
                        select: {
                            id: true,
                            titulo: true,
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            nome: true,
                            email: true
                        }
                    }
                }
            });
            return movieRentUpdated
        } catch (err) {
            const { idRelacao } = req.query
            const { movieId, userId } = req.body;
            const relationNotExist = await prisma.movieRent.findUnique({
                where: {
                    idRelacao: Number(idRelacao)
                }
            })
            if (!relationNotExist) {
                throw new AppError(`Alugel com ID ${idRelacao} não foi encontrado.`, 404)
            }

            const movieNotExist = await prisma.movies.findUnique({
                where: {
                    id: Number(movieId)
                }
            })
            if (!movieNotExist) {
                throw new AppError(`Filme com ID ${movieId} não foi encontrado`, 404)
            }

            const userNotExist = await prisma.users.findUnique({
                where: {
                    id: Number(userId)
                }
            })
            if (!userNotExist) {
                throw new AppError(`Usuário com ID ${userId} não foi encontrado`, 404)
            }
        }
    }
}