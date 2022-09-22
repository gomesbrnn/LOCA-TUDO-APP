import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class GetMoviesById{
    async execute(req: Request){
        const {id} = req.query
        const movies  = await prisma.movies.findUnique({
            where:{
                id: Number(id)
            }
        })
        if(movies == null){
            throw new AppError(`Nenhum filme com o ID ${id} foi encontrado.`, 404)
        }

        return movies
    }
}