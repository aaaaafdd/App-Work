import {Request, Response} from 'express'
import {Op} from 'sequelize'
import {Room} from "../models/relations";
import sequelize from '../database/database';

export async function createRoom(req: Request, res: Response): Promise<void>{
    const {id_admin, roomName, description} = req.body;
    try {

        if (!id_admin) {
            res.status(400).json({ status: 'error', error: 'id_admin is required' });
            return;
        }
        const roomCreated = await Room.create({
            id_admin: id_admin,
            roomName: roomName,
            description: description
        })
        await roomCreated.addUser(id_admin)
        res.status(201).json({status: 'success', message: 'Room created successfully', room: roomCreated})    
    } catch (e) {
        res.status(400).json({status: 'error', error: e})
        console.log(e)
        return;
    }
}

export async function getAllRooms(req: Request, res: Response): Promise<void>{
    try {
        const {userId} = req.params;
        if(!userId){
            return;
        }
        const rooms = await Room.findAll({
            where: {
                id: {
                    [Op.notIn]: sequelize.literal(
                        `(SELECT "roomId" FROM "RoomUser" WHERE "userId" = '${userId}')`
                    )
                }
            },
            attributes: ['id', 'roomName'],
        });
        res.status(200).json({status: 'success', rooms})
    } catch (e){
        res.status(400).json({status: 'error', error: e})
        return;
    }
}

export async function joinRoom(req: Request, res: Response): Promise<void>{
    const {id_user, id_room} = req.body;
    try {
        const room = await Room.findByPk(id_room)
        if(!room){
            res.status(404).json({status: 'error', error: 'Room not found'})
            return;
        }
        await room.addUser(id_user)
        res.status(200).json({status: 'success', message: 'User added to room successfully'})
    } catch (e) {
        console.log(e)
        res.status(400).json({status: 'error', error: e})
        return;
    }
}