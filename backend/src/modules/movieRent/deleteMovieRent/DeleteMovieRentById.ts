import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class DeleteMovieRentId{
    async execute(req:Request){
        const { idRelacao } = req.query
        const movieRentNotExist = await prisma.movieRent.findUnique({
            where:{
               idRelacao: Number(idRelacao)
            }
        });
        if(!movieRentNotExist){
            throw new AppError(`Alugel com o Id ${idRelacao} não foi encontrado`, 404);
        }

        await prisma.movieRent.delete({
            where:{
                idRelacao: Number(idRelacao)
            }
        });
        
        return 'Excluído com sucesso'
    }
}