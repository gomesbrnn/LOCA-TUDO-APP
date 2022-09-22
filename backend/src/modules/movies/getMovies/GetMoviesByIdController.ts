import { Request, Response } from "express";
import { GetMoviesById } from "./GetMoviesById";

export class GetMoviesByIdController {
    async handle(req: Request, res: Response) {
        const getMoviesById = new GetMoviesById();

        const result = await getMoviesById.execute(req);

        return res.status(200).json(result)
    }
}