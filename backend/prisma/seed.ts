import { roles } from './roles';
import { PrismaClient } from '@prisma/client'
import { users } from './users';
import { movies } from './movies';
import { rents } from './rents'

const prisma = new PrismaClient();

async function seedDataBase() {
    for (let movie of movies) {
        await prisma.movies.create({
            data: movie
        })
    }
    for (let role of roles) {
        await prisma.roles.create({
            data: role
        })
    }
    for (let user of users) {
        await prisma.users.create({
            data: user
        })
    }
    for (let rent of rents) {
        await prisma.movieRent.create({
            data: rent
        })
    }
}

seedDataBase()


