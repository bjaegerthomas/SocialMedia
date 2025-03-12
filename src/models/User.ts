import { Schema, Document, model, Types } from 'mongoose';

interface IUser extends Document {
    userId: Types.ObjectId;
    username: string;
    email: string;
    thoughts: Types.ObjectId[];
    friends: Types.ObjectId[];
  }

const userSchema = new Schema<IUser>(
    {
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
    },
    {
        // Include virtuals in our JSON return data
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Virtual property `friendCount` that gets the user's friend count
userSchema
  .virtual('friendCount')
  // Getter
  .get(function (this: IUser) {
    return this.friends.length;
  });

// Initialize the User model
const User = model<IUser>('User', userSchema);

export default User;