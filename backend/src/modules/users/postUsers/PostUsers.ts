import { Users } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { IUserDTO } from "../../dtos/UsersDTO";
import { AppError } from "../../errors/AppError";
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import { cpf } from 'cpf-cnpj-validator'
const cpfValidator = cpf
import * as EmailValidator from 'email-validator';




export class PostUsers {
    async execute({ nome, email, cpf, senha }: IUserDTO): Promise<Users> {
        const EmailAlreadyExists = await prisma.users.findUnique({
            where: {
                email
            }
        });

        if (EmailAlreadyExists) {
            throw new AppError('Email já cadastrado.', 409)
        }

        const emailValido = EmailValidator.validate(email)
        if(emailValido == false){
            throw new AppError('Email inválido', 400)
        }

        const cpfValido = cpfValidator.isValid(cpf)
        if(cpfValido == false){
            throw new AppError('CPF Inválido.', 400)
        }
        
        const cpfAlreadyExists = await prisma.users.findUnique({
            where: {
                cpf
            }
        })

        if (cpfAlreadyExists) {
            throw new AppError('CPF já cadastrado.', 409)
        }

        const passwordHash = await bcrypt.hash(senha, 10)

        const userCreated = await prisma.users.create({
            data: {
                nome,
                email,
                senha: passwordHash,
                cpf,
                roleId: 2
            }
        });

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
            to: userCreated.email,
            subject: 'Bem vindo(a) a Loca-Tudo!',
            html: `<h1>Olá, ${userCreated.nome}!</h1> <p>Obrigado por fazer parte da Loca-Tudo, os melhores filmes e preços em um só lugar! </p><p>Att: Equipe LocaTudo</p>`
        }).then(() => {
            console.log('email send.');

        }).catch((err) => {
            console.log('err->>>>>>>>>>>>>', err);
            return userCreated
        });



        return userCreated

    }
}