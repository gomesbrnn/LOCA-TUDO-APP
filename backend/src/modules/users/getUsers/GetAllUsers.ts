import { Users } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetAllUsers {
    async execute(): Promise<Users[]> {
        const users = await prisma.users.findMany({
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
        if (users.length == 0) {
            throw new AppError('Nenhum usuário cadastrado.', 404)
        }


        return users;
    }
}