import { Router } from "express";
import multer from 'multer';
import multerConfig from '../config/multer'


import { GetAllMoviesController } from "../modules/movies/getMovies/GetAllMoviesController";
import { PostMoviesController } from "../modules/movies/postMovies/PostMoviesController";
import { DeleteMoviesController } from "../modules/movies/deleteMovies/DeleteMoviesControllet";
import { UpdateMoviesController } from "../modules/movies/updateMovies/UpdateMoviesController";
import { GetMovieByGenderController } from "../modules/movies/getMovies/GetMoviesByGenderController";
import { GetMoviesByNameController } from "../modules/movies/getMovies/GetMoviesByNameController";
import { auth } from "../middlewares/auth";
import { roleAdmin } from "../middlewares/permissions";
import { GetMoviesByIdController } from "../modules/movies/getMovies/GetMoviesByIdController";

const upload = multer(multerConfig);

const postMovies = new PostMoviesController();
const getAllMovies = new GetAllMoviesController();
const getMoviesByGender = new GetMovieByGenderController();
const getMoviesByName = new GetMoviesByNameController();
const getMoviesById = new GetMoviesByIdController();
const deleteMovies = new DeleteMoviesController();
const updateMovies = new UpdateMoviesController();

const movieRoutes = Router();

movieRoutes.get('/all', getAllMovies.handle);
movieRoutes.get('/gender', getMoviesByGender.handle);
movieRoutes.get('/name', getMoviesByName.handle);
movieRoutes.get('/id', getMoviesById.handle);
movieRoutes.post('/', upload.single('imagem'), auth(), roleAdmin(), postMovies.handle);
movieRoutes.delete('/delete', auth(), roleAdmin(), deleteMovies.handle)
movieRoutes.patch('/update', upload.single('imagem'), auth(), roleAdmin(), updateMovies.handle)

export { movieRoutes }