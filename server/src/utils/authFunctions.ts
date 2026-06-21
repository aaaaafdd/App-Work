import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

const saltRounds = 10
const jwtSecret = process.env.SECRET_KEY || 'default'

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export async function generateToken(payload: object): Promise<string> {
    return jwt.sign(payload, jwtSecret);
}

export async function verifyToken(token: string): Promise<any>{
    return jwt.verify(token, jwtSecret);
}