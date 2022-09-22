import { Request, Response } from "express";
import { GetAllUsers } from "./GetAllUsers";

export class GetAllUsersController {
    async handle(req: Request, res: Response) {
        const getAllUsers = new GetAllUsers();

        const result = await getAllUsers.execute();

        return res.status(200).json(result);
    }
}