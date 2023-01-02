import { check } from "express-validator";

export const signUpValidation = [
  check("name", "Please Enter a Valid Name").not().isEmpty(),
  check("username", "Please Enter a Valid Username").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6,
  }),
];

export const signInValidation = [  
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a valid password").isLength({
    min: 6,
  }),
];