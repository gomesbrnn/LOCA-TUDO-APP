import { Request, Response } from "express";
import { GetMovieRentById } from "./GetMovieRentById";

export class GetMovieRentByIdController {
    async handle(req: Request, res: Response) {
        const getMovieRentById = new GetMovieRentById();

        const result = await getMovieRentById.execute(req);

        return res.status(200).json(result)
    }
}