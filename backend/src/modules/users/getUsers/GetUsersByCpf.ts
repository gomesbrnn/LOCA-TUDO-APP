import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetUsersByCpf {
    async execute(req: Request, res: Response) {
        const {cpf} = req.query
        const users = await prisma.users.findUnique({
            where: {
                cpf:String(cpf)
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
                                imagem:true
                            }
                        }
                    }
                }
            }
        })
        if(users == null){
            throw new AppError(`Nenhum usuário com cpf ${cpf} foi encontrado.`, 404);
        }

        return users;
    }
}