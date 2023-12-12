import express from "express";
import UsersController from "../controllers/usersController.js";

const router = express.Router();

router
    .get("/users", UsersController.listUsers)
    .get("/users/:id", UsersController.listUserById)
    .post("/users", UsersController.registerUser)
    .put("/users/:id", UsersController.updateUser)
    .delete("/users/:id", UsersController.deleteUser)

export default router;