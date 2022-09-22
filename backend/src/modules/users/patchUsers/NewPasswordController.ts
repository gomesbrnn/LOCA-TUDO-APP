import { Request, Response } from "express";
import { NewPassword } from "./NewPassword";

export class NewPasswordController {
    async handle(req: Request, res: Response) {
        const updatadeUser = new NewPassword();

        const result = await updatadeUser.execute(req);

        return res.status(200).json(result)
    }
}