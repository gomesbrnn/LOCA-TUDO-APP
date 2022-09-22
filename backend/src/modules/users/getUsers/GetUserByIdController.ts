import { Request, Response } from "express";
import { GetUserById } from "./GetUserById";

export class GetUserByIdController {
    async handle(req: Request, res: Response) {
        const getUserById = new GetUserById();

        const result = await getUserById.execute(req, res);

        return res.status(200).json(result)
    }
}