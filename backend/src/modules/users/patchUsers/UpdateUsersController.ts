import { Request, Response } from "express";
import { UpdateUsers } from "./UpdateUsers";

export class UpdateUserController {
    async handle(req: Request, res: Response) {
        const updatedUser = new UpdateUsers();

        const result = await updatedUser.execute(req);

        return res.status(200).json(result)
    }
}