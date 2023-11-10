import mongoose, { Schema } from 'mongoose';


interface LocalUserDocument extends Document {
    email: string,
    password: string
    type: string
}


const LocalUserSchema: Schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true}
});

const LocalUserModel = mongoose.model<LocalUserDocument>('LocalUser', LocalUserSchema);

export default LocalUserModel;
