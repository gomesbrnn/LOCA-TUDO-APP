import { MovieRent } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetAllMovieRent{
    async execute(): Promise<MovieRent[]>{
        const movieRent = await prisma.movieRent.findMany({  
            orderBy:{
                alugado_em: "asc"
            },
            include:{
                user:{
                    select:{
                        id: true,
                        nome: true,
                        email: true
                    },
                },
                movie:{
                    select:{
                        id:true,
                        titulo: true,
                        genero: true,
                        imagem: true
                    },
                }
            }
        })
        if(movieRent.length ==  0){
            throw new AppError('Nenhum filme alugado.', 404)
        }

        return movieRent
    }
}