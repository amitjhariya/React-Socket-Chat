import { Router } from "express";
import {getAll,create} from "../controllers/GroupsController.js";

const router=Router()

router.get('/',async(req,res)=>{
    await getAll(req,res)
})

router.post('/',async(req,res)=>{
    await create(req,res)
})





export default router