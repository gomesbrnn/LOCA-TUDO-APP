import { MovieRent } from "@prisma/client";
import { prisma } from "../../../prisma/client";
import { IMovieRentDTO } from "../../dtos/MovieRentDTO";
import { AppError } from "../../errors/AppError";
import * as nodemailer from 'nodemailer'
import fs from 'fs';


export class PostMovieRent {
    async execute({ movieId, userId }: IMovieRentDTO): Promise<MovieRent> {
  
        const movieExist = await prisma.movies.findUnique({
            where: {
                id: movieId
            }
        });

        if (!movieExist) {
            throw new AppError(`Filme com ID ${movieId} não está cadastrado`, 404)
        }

        const userExist = await prisma.users.findUnique({
            where: {
                id: userId
            }
        });

        if (!userExist) {
            throw new AppError(`O usuário com ID ${userId} não está cadastrado.`, 404)
        }

        const result = await prisma.movieRent.create({
            data: {
                movieId,
                userId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        nome: true,
                        email: true
                    },
                },
                movie: {
                    select: {
                        id: true,
                        titulo: true,
                        genero: true,
                        imagem: true
                    },
                }
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
        const data = new Date()
    
        await transporter.sendMail({
            from: 'Loca-Tudo <loca.tudoapi@gmail.com>',
            to: userExist.email,
            subject: 'Novo filme alugado!',
            html: `<h1>Olá, ${userExist.nome}!</h1> <p>Você acabou de alugar o filme ${movieExist.titulo} por R$${movieExist.preco}</p><img src="cid:poster" width="340" height="500" /><p>Agradeçemos a sua preferencia! 🎬 </p></p><p>Att: Equipe LocaTudo, ${data.toLocaleString()}</p>`,
            attachments:[
                {
                    filename: `${movieExist.imagem}`,
                    path: './uploads/'+movieExist.imagem,
                    cid: 'poster'
                }
            ]
        
        }).then(() => {
            console.log('email send.');

        }).catch((err) => {
            console.log('err->>>>>>>>>>>>>', err);
            return result
        });


        return result
    }
}

