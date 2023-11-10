import mongoose, { Schema } from 'mongoose';


interface GoogleUserDocument extends Document {
    googleId: string
    email: string
    type: string
}

const GoogleUserSchema: Schema = new Schema({
    googleId: {type: String, required: true},
    email: {type: String, required: true},
    type: {type: String, required: true}
});

const GoogleUserModel = mongoose.model<GoogleUserDocument>('GoogleUser', GoogleUserSchema);

export default GoogleUserModel;
