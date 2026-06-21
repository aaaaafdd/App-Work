import {Request, Response} from 'express'
import {Op} from 'sequelize'
import {User} from "../models/relations";
import sequelize from '../database/database';

export async function getUser(req: Request, res: Response): Promise<void>{
    const {userId} = req.params;
    try {
        const user = await User.findByPk(userId)
        if(!user){  
            res.status(404).json({status: "error", error: "User not found"})
            return;
        }
        res.status(200).json({status: "success", user})
    } catch(e){
        res.status(400).json({status: "error", error: e})
    }
    
}

export async function getUserRooms(req: Request, res: Response): Promise<void> {
    const {userId} = req.params;
    try {
        const user = await User.findByPk(userId)
        if(!user){  
            res.status(404).json({status: "error", error: "User not found"})
            return;
        }
        const rooms = await user.getRooms();
        res.status(200).json({status: "success", rooms})
    } catch(e){
        res.status(400).json({status: "error", error: e})
    }
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const {userId} = req.params;
        const users = await User.findAll({
            where: {
                id: {
                    [Op.ne]: userId, 
                    [Op.notIn]: sequelize.literal(
                        `(SELECT id_contact FROM contacts WHERE id_user = '${userId}')`
                    ),
                }
            },
            attributes: ['id', 'username', 'status']  
        });
        res.status(200).json({status: "success", users})
    } catch(e){
        res.status(400).json({status: "error", error: e})
    }
}