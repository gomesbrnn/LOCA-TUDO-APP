import { Request } from "express";
import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";
import * as crypto from 'crypto'
import * as nodemailer from 'nodemailer'
import * as bcrypt from 'bcrypt'

export class NewPassword {
    async execute(req: Request) {

        const { email, cpf } = req.body
        const user = await prisma.users.findFirst({
            where: {
                email: String(email),
                AND: {
                    cpf: String(cpf)
                }
            }
        })
        if (!user) {
            throw new AppError(`Endereço de e-mail vinculado a esse CPF não foi encontrado.`, 404)
        }


        const newPassword = crypto.randomBytes(4).toString('hex');
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'loca.tudoapi@gmail.com',
                pass: 'iixyxlnatphkkjdi'
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        await transporter.sendMail({
            from: 'Loca-Tudo <loca.tudoapi@gmail.com>',
            to: user.email,
            subject: 'Redefinição de senha Loca-Tudo',
            html: `<h1>Olá, ${user.nome}!</h1> <p>Uma nova senha foi gearada para esta conta: ${newPassword} </p>`
        }).then(
            async () => {

                const hashPassword = await bcrypt.hash(newPassword, 10)

                await prisma.users.update({
                    data: {
                        senha: String(hashPassword),
                    },
                    where: {
                        email: String(email),
                    }
                })
            }
        ).catch((err) => {
            console.log('err->>>>>>>>>>>>>', err);
            return user
        })

        return 'Nova senha enviada no email'
    }
}