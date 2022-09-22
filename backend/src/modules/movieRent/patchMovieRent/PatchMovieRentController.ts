import { Request, Response } from "express";
import { PatchMovieRents } from "./PatchMovieRent";

export class PatchMovieRentController {
    async handle(req: Request, res: Response) {
        const patchMovieRent = new PatchMovieRents();

        const result = await patchMovieRent.execute(req);

        return res.status(200).json(result)
    }
}