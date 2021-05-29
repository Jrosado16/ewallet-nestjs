import { Document } from 'mongoose'

export interface iRecord extends Document {
    accreditedUser: string
    userReceived: string
    amount: number
}