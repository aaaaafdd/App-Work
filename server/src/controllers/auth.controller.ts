import {Request, Response} from 'express'
import {User} from "../models/relations";
import { hashPassword, comparePassword, generateToken } from '../utils/authFunctions'

export async function registerUser(req: Request, res: Response): Promise<void>{
    const {username, email, password} = req.body;
    const hashedPassword = await hashPassword(password);
    
    try {
        const userCreated = await User.create({
            username,
            email,
            password: hashedPassword
        })
        res.status(201).json({status: 'success', message: "User created succesfullly"})
    } catch(e){
        console.log(e)
        res.status(400).json({status: 'error', error: e})
    }
}

export async function loginUser(req: Request, res: Response): Promise<void>{
    const {email, password} = req.body;

    try {
        const user = await User.findOne({where: {email}})
        if(!user){
            res.status(404).json({status: 'error', error: "User not found"})
            return;
        }
        const isPasswordValid = await comparePassword(password, user.password)
        if(!isPasswordValid){
            res.status(401).json({status: 'error', error: "Invalid password"})
            return;
        }

        const token = await generateToken({id: user.id, email: user.email})
        res.status(200).json({status: 'success', message: "Login successful", token, user: {id: user.id, username: user.username}})
    } catch(e){
        res.status(400).json({status: 'error', error: e})
    }
}
