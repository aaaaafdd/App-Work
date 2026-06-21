import {Request, Response} from 'express'
import {RoomMessage, User} from '../models/relations'

export async function getChatMessages(req: Request, res: Response): Promise<void> {
    try {
        const {roomId} = req.params;
        const messages = await RoomMessage.findAll({
            where: {
                roomId
            },
            order: [['createdAt', 'ASC']],
            include: [{
                model: User,
                as: 'receivedUserRoom',  
                attributes: ['id', 'username'], 
            }]
        })
        res.status(200).json({status: 'success', messages});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching chat', errorMsg: error});
    }
}