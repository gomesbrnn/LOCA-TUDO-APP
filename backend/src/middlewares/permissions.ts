import { NextFunction, Request, Response } from "express";
import { AppError } from "../modules/errors/AppError";
import { prisma } from "../prisma/client";

export function roleAdmin() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;

        const user = await prisma.users.findUnique({
            where: {
                email: String(userEmail),
            },
            include: {
                role: {
                    select: {
                        role: true
                    }
                }
            }
        });

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        const roles = user.roleId;

        if (roles != 1) {
            throw new AppError('Não tem permissão');
        }

        return next();
    }
}

export function onlyYour() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;

        const user = await prisma.users.findUnique({
            where: {
                email: String(userEmail),
            },
            include: {
                role: {
                    select: {
                        role: true
                    }
                }
            }
        });

        const { id } = req.query
        const users = await prisma.users.findUnique({
            where: {
                id: Number(id)
            },
        })

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        const roles = user.roleId;
        if (roles != 1) {
            if (userEmail != users?.email) {
                throw new AppError('Voce não tem permissões para acessar dados de outro usuário.');
            }
        }


        return next();
    }
}

export function onlyYourRent() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { userEmail } = req;

        const user = await prisma.users.findUnique({
            where: {
                email: String(userEmail),
            },
            include: {
                role: {
                    select: {
                        role: true
                    }
                }
            }
        });

        const { idRelacao } = req.query
        const users = await prisma.movieRent.findUnique({
            where: {
                idRelacao: Number(idRelacao)
            },
            include:{
                user:{
                    select:{
                        id: true,
                        email:true
                    }
                }
            }
        })

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        const roles = user.roleId;
        if (roles != 1) {
            if (userEmail != users?.user.email) {
                throw new AppError('Voce não tem permissões para acessar dados de outro usuário.');
            }
        }


        return next();
    }
}