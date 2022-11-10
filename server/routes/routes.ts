import express from "express";

import { Routes } from "../enums";
import { shoppingListDetailsController } from "../modules/shopping-list-details/shopping-list-details.controller";
import { shoppingListsController } from "../modules/shopping-lists/shopping-lists.controller";
import { userController } from "../modules/user/user.controller";

const routes = (server: express.Application): void => {
  server.use(Routes.usersRoute, userController.router);
  server.use(Routes.shoppingListsRoute, shoppingListsController.router);
  server.use(Routes.shoppingListsRoute, shoppingListDetailsController.router);
};

export default routes;
