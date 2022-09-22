import { Request, Response } from "express";
import { GetAllMovies } from "./GetAllMovies";

export class GetAllMoviesController {
    async handle(req: Request, res: Response) {
        const getAllMovies = new GetAllMovies();

        const result = await getAllMovies.execute();

        return res.status(200).json(result)
    }
}