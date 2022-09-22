import { Request, Response } from "express";
import { GetAllMovieRent } from "./GetAllMovieRent";

export class GetAllMovieRentController {
    async handle(req: Request, res: Response) {
        const getAllMovieRent = new GetAllMovieRent();

        const result = await getAllMovieRent.execute();

        return res.status(200).json(result);
    }
}