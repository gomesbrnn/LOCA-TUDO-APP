import { Request, Response } from "express";
import { PostMovieRent } from "./PostMovieRent";

export class PostMovieRentController {
    async handle(req: Request, res: Response) {
        const { movieId, userId } = req.body;

        const createRelation = new PostMovieRent();

        const result = await createRelation.execute({ movieId, userId });

        return res.status(200).json(result)
    }
}