import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";

export class DeleteUserById {
    async execute(req: Request) {
        const { id } = req.query
        const userNotExist = await prisma.users.findUnique({
            where: {
                id: Number(id)
            }
        });
        if (!userNotExist) {
            throw new AppError(`Usuário com ID ${id} não foi encontrado`, 404)
        }

        const deletedUser = await prisma.users.delete({
            where: {
                id: Number(id)
            }
        });

        const result = (`O usuário ${deletedUser.email} com ID ${id} foi excluído com sucesso.`);

        return result
    }
}