import { Router } from "express";
import { DeleteMovieRentController } from "../modules/movieRent/deleteMovieRent/DeleteMovieRentController";
import { GetAllMovieRentController } from "../modules/movieRent/getMovieRent/GetAllMovieRentController";
import { PatchMovieRentController } from "../modules/movieRent/patchMovieRent/PatchMovieRentController";
import { PostMovieRentController } from "../modules/movieRent/postMovieRent/PostMovieRentController";
import { auth } from "../middlewares/auth";
import { roleAdmin, onlyYourRent } from "../middlewares/permissions";
import { GetMovieRentByIdController } from "../modules/movieRent/getMovieRent/GetMovieRentByIdController";

const postMovieRent = new PostMovieRentController();
const getAllMovieRent = new GetAllMovieRentController();
const deleteMovieRentById = new DeleteMovieRentController();
const patchMovieRent = new PatchMovieRentController();
const getMovieRentById = new GetMovieRentByIdController();

const movieRentRoutes = Router();

movieRentRoutes.get('/all', auth(), roleAdmin(), getAllMovieRent.handle);
movieRentRoutes.post('/', postMovieRent.handle);
movieRentRoutes.delete('/delete', auth(), roleAdmin(), deleteMovieRentById.handle);
movieRentRoutes.patch('/update', auth(), roleAdmin(), patchMovieRent.handle);
movieRentRoutes.get('/id', auth(), onlyYourRent(), getMovieRentById.handle)

export { movieRentRoutes }