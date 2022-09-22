import { prisma } from "../../../prisma/client";
import { AppError } from "../../errors/AppError";
import { sign } from "jsonwebtoken";
import * as bcrypt from 'bcrypt'
import * as nodemailer from 'nodemailer'
import os from 'os';

const userPc = os.userInfo().username
var pc = os.type()
if(pc == 'Windows_NT' ){
    pc = String('Windows')
}


type userRequest = {
    email: string;
    senha: string;
};

export class Login {
    async execute({ email, senha, }: userRequest) {
      
        
        const user = await prisma.users.findUnique({
            where: {
                email: String(email)
            }
        })

        if (!user) {
            throw new AppError('Email ou senha incorretos')
        }

        if (await bcrypt.compare(senha, user.senha)) {

            //@ts-ignore
            const token = sign({}, process.env.APP_SECRET, {
                subject: user.email,
                expiresIn: '1d'
            });


            let role: string = 'User';

            if (user.roleId == 2) {
                role = String('User')
            } else if (user.roleId == 1) {
                role = String('Admin')
            }

            const data = {
                id: user.id,
                email: user.email,
                role: role,
                token,
            }

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

            const dataAtual = new Date()
            
         

            await transporter.sendMail({
                from: 'Loca-Tudo <loca.tudoapi@gmail.com>',
                to: user.email,
                subject: 'Novo login feito na Loca-Tudo!',
                html: `<h1>Olá, ${user.nome}!</h1> <p>Novo login feito no site Loca-Tudo com este endereço de email no dia: ${dataAtual.toLocaleDateString()}, ás ${dataAtual.toLocaleTimeString()}</p><p>Plataforma: ${pc}</p> <p>Usuário: ${userPc}</p> Caso voce tenha efetuado o login pode desconsiderar este email, em caso de atividade suspeita na sua conta considere mudar sua senha IMEDIATAMENTE. <p>Att: Equipe LocaTudo</p>`
            }).then(() => {
                console.log('email send.');

            }).catch((err) => {
                console.log('err->>>>>>>>>>>>>', err);
                return data
            });


            return { data }

        } else {
            throw new AppError('Email ou senha incorretos')
        }

    }
}