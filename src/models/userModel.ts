import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  lastname: string;
  phone: number;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: Number,
})

export const UserModel = mongoose.model<IUser>('user', userSchema)
