import express from "express";
import users from "./usersRoutes.js";
import missions from "./missionsRoutes.js";
import historical from "./historicalRoutes.js";

const routes = (app) => {
    app.use(
        express.json(),
        users,
        missions,
        historical
    )
}

export default routes