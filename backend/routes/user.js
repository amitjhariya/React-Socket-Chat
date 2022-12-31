import { Router } from "express";
import {signUp,signIn,findUser} from './../controllers/AuthController.js'
import { signInValidation,signUpValidation } from "../validations/user.js";
import Auth from './../middlewares/auth.js'
const router = Router();

router.post("/signup",signUpValidation,signUp);

router.post("/signin",signInValidation,signIn);
router.get("/me", Auth, findUser);

export default router;
