import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture:{
        type: String,
        dafault: "https://imgs.search.brave.com/TTWjkCnrJRF1di-RfGC9khqVzZWZd4beDFojTfD9KPk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAyMy8w/Mi8xOC8xMS8wMC9p/Y29uLTc3OTc3MDRf/NjQwLnBuZw",
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
