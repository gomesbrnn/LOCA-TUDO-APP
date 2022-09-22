import { Request, Response } from "express";
import { DeleteMovies } from "./DeleteMovies";

export class DeleteMoviesController {
    async handle(req: Request, res: Response) {
        const deleteMovie = new DeleteMovies();

        const result = await deleteMovie.execute(req);

        return res.status(200).json(result)
    }
}