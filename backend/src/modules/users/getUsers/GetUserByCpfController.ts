import { Request, Response } from "express";
import { GetUsersByCpf } from "./GetUsersByCpf";

export class GetUserByCpfController {
    async handle(req: Request, res: Response) {
        const getUserByCpf = new GetUsersByCpf();

        const result = await getUserByCpf.execute(req, res);

        return res.status(200).json(result)
    }
}