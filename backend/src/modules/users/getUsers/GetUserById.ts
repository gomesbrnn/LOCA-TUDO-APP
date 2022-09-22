import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetUserById {
    async execute(req: Request, res: Response) {
        const {id} = req.query     
        const users = await prisma.users.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                movie_rent: {
                    select: {
                        idRelacao: true,
                        alugado_em: true,
                        movie: {
                            select:{
                                id:true,
                                titulo:true,
                                genero:true,
                                anoLancamento: true,
                                duracao:true,
                                preco: true,
                                imagem:true
                            }
                        }
                    }
                }
            }
        })   
        if (users == null) {
            throw new AppError(`Nenhum usuário com ID ${id} foi encontrado.`, 404);
        }

        return users;
    }
}