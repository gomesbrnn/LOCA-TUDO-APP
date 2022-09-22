import { Request, Response } from "express";
import { GetMoviesByName } from "./GetMoviesByName";

export class GetMoviesByNameController {
    async handle(req: Request, res: Response) {
        const getMoviesByName = new GetMoviesByName();

        const result = await getMoviesByName.execute(req, res);

        return res.status(200).json(result)
    }
}