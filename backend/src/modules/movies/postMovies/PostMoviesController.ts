import { Request, Response } from "express";
import { PostMovies } from "./PostMovies";



export class PostMoviesController {
    async handle(req: Request, res: Response) {
        const postMovies = new PostMovies();

        const result = await postMovies.execute(req);
             
        return res.status(201).json(result)
    }
}