import mongoose from "mongoose";
const { Schema, model } = mongoose

const roomSchema = new Schema({
    comment: {type: String, maxlenght: 200},
    rommId: {type: Schema.Types.ObjectId, ref: 'Room'},
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
    
});

const Review = model('Review', roomSchema)
export default Review