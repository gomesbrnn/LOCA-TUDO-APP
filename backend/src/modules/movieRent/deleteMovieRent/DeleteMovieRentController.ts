import { Request, Response } from "express";
import { DeleteMovieRentId } from "./DeleteMovieRentById";

export class DeleteMovieRentController {
    async handle(req: Request, res: Response) {
        const deleteMovieRent = new DeleteMovieRentId();

        const result = await deleteMovieRent.execute(req);

        return res.status(200).json(result)
    }
}