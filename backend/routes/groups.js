import { Router } from "express";
import {getAll,create,getMessages} from "../controllers/GroupsController.js";

const router=Router()





router.get('/',async(req,res)=>{
    await getAll(req,res)
})



router.post('/',async(req,res)=>{
    await create(req,res)
})

router.get('/messages/:id',async(req,res)=>{
    await getMessages(req,res)
})



export default router