import { Router } from "express";
import Groups from './groups.js'
import Auth from './user.js'

const router=Router()

router.get('/',(req,res)=>{
    res.send(`<h1>Server is up and running..<h1/>`)
})

router.use('/api/v1/auth',Auth)

router.use('/api/v1/groups',Groups)



export default router