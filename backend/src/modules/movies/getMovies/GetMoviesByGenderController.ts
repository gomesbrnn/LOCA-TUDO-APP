import { Request, Response } from "express";
import { GetMoviesByGender } from "./GetMoviesByGender";

export class GetMovieByGenderController {
    async handle(req: Request, res: Response) {
        const getMoviesByGender = new GetMoviesByGender();

        const result = await getMoviesByGender.execute(req, res);

        return res.status(200).json(result)
    }
}