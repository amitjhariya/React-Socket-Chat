import { Router } from "express";
import {findUser} from '../controllers/UserController.js'
const router = Router();

router.get("/:id", findUser);

export default router;
