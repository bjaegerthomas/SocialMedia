import { Schema, model, Types } from 'mongoose';
const userSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.+\..+/, // regex for email validation
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    // Include virtuals in our JSON return data
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// Virtual property `friendCount` that gets the user's friend count
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
    return this.friends.length;
});
// Initialize the User model
const User = model('User', userSchema);
export default User;
