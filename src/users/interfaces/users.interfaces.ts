import { Document } from 'mongoose'

export interface iUsers extends Document {
    firtsName: string
    lastName: string
    password: string
    email: string
    balance: number
}