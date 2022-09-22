import { Request, Response } from "express";
import { GetUsersByName } from "./GetUsersByName";

export class GetUsersByNameController {
    async handle(req: Request, res: Response) {
        const getUsersByName = new GetUsersByName();

        const result = await getUsersByName.execute(req, res);

        return res.status(200).json(result)
    }
}