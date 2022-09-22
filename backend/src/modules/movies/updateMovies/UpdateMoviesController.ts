import { Request, Response } from "express";
import { UpdateMovies } from "./UpdateMovies";

export class UpdateMoviesController {
    async handle(req: Request, res: Response) {
        const updateMovies = new UpdateMovies();

        const result = await updateMovies.execute(req);

        return res.status(200).json(result)
    }
}