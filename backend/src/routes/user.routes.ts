import { Request, Response, Router } from "express";
import { DeleteUserByIdController } from "../modules/users/deleteUsers/DeleteUserByIdController";
import { GetAllUsersController } from "../modules/users/getUsers/GetAllUsersController";
import { GetUserByCpfController } from "../modules/users/getUsers/GetUserByCpfController";
import { GetUserByIdController } from "../modules/users/getUsers/GetUserByIdController";
import { GetUsersByNameController } from "../modules/users/getUsers/GetUsersByNameController";
import { UpdateUserController } from "../modules/users/patchUsers/UpdateUsersController";
import { PostUsersController } from "../modules/users/postUsers/PostUsersController";
import { auth } from "../middlewares/auth";
import { roleAdmin, onlyYour } from "../middlewares/permissions";
import { LoginController } from "../modules/users/login/loginController";
import { NewPasswordController } from "../modules/users/patchUsers/NewPasswordController";


const postUser = new PostUsersController();
const getallUser = new GetAllUsersController();
const getUsersByName = new GetUsersByNameController();
const getUserById = new GetUserByIdController();
const getUserByCpf = new GetUserByCpfController();
const deleteUser = new DeleteUserByIdController();
const updateUser = new UpdateUserController();
const newPassword = new NewPasswordController();
const login = new LoginController;

const userRoutes = Router();

userRoutes.post('/login', login.handle);
userRoutes.post('/', postUser.handle);
userRoutes.patch('/password', newPassword.handle);

userRoutes.get('/all', auth(), roleAdmin(), getallUser.handle);

userRoutes.get('/nome', auth(), roleAdmin(), getUsersByName.handle);
userRoutes.get('/cpf', auth(), roleAdmin(), getUserByCpf.handle);
userRoutes.get('/id', auth(), onlyYour(), getUserById.handle);
userRoutes.delete('/delete', auth(), onlyYour(), deleteUser.handle);
userRoutes.patch('/update', auth(), onlyYour(), updateUser.handle);


export { userRoutes }