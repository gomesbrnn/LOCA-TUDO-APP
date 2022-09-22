import { Request, Response } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetUsersByName{
    async execute(req: Request, res: Response){
        const {nome} = req.query
        const users = await prisma.users.findMany({
            where:{
                nome: {
                    contains: String(nome)
                }, 
            },
            orderBy: {
                nome: "asc"
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

        if(users.length == 0){
            throw new AppError(`Nenhum usuário com nome ${nome} foi encontrado.`, 404)
        }

        return users;
    }
}