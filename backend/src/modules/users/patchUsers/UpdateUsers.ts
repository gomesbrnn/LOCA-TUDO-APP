import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";
import * as bcrypt from 'bcrypt'


export class UpdateUsers {
    async execute(req: Request) {
        try {
            const { nome, email, cpf, senha } = req.body
            const { id } = req.query
            const oldPassword = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (senha == undefined) {
                const userUpdated = await prisma.users.update({
                    data: {
                        nome: String(nome),
                        email: String(email),
                        senha: String(oldPassword?.senha),
                        cpf: String(cpf)
                    },
                    where: {
                        id: Number(id)
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true
                    }
                })

                return userUpdated
            } else {
                const newPassword = await bcrypt.hash(senha, 10)
                const userUpdated = await prisma.users.update({
                    data: {
                        nome: String(nome),
                        email: String(email),
                        senha: String(newPassword),
                        cpf: String(cpf)
                    },
                    where: {
                        id: Number(id)
                    },
                    select: {
                        id: true,
                        nome: true,
                        email: true,
                        cpf: true
                    }
                })

                return userUpdated
            }

        } catch (err) {
            const { id } = req.query
            const { email, cpf } = req.body

            const userNotExist = await prisma.users.findUnique({
                where: {
                    id: Number(id)
                }
            })
            if (!userNotExist) {
                throw new AppError(`Usuário com ID ${id} não foi encontrado.`, 404)
            }

            const emailAlreadyRegistered = await prisma.users.findUnique({
                where: {
                    email: String(email)
                }
            })

            
            if (emailAlreadyRegistered?.email != userNotExist.email) {
                throw new AppError(`E-mail ${email} já esta cadastrado.`, 409)
            }

            const cpfAlreadyRegistered = await prisma.users.findUnique({
                where: {
                    cpf: String(cpf)
                }
            })

            if (cpfAlreadyRegistered?.cpf != userNotExist.cpf) {
                throw new AppError(`CPF ${cpf} já esta cadastrado`, 409)
            }




        }


    }

}