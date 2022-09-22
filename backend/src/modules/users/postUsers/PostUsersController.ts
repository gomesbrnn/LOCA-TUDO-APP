import { Request, Response } from "express";
import { PostUsers } from "./postUsers";

export class PostUsersController{
    async handle(req: Request, res:Response){
        const { nome, email, senha, cpf} = req.body;

        const postUser = new PostUsers();

        const result = await postUser.execute({nome, email, senha, cpf})

        return res.status(201).json(result)
    }
}