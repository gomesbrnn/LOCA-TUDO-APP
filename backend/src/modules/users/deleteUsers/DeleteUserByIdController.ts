import { Request, Response } from "express";
import { DeleteUserById } from "./DeleteUserById";

export class DeleteUserByIdController {
    async handle(req: Request, res: Response) {
        const deleteUserById = new DeleteUserById();

        const result = await deleteUserById.execute(req);

        return res.status(200).json(result)
    }
}