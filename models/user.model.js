import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name.'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email.'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/.+@[a-zA-Z0-9_]+/, 'Please enter a valid email.'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password.'],
        minlength: 6,
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

