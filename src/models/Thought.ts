import { Schema, Document, model, Types } from 'mongoose';

interface IReaction extends Document {
    reactionID: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
  }

interface IThought extends Document {
    thoughtId: Types.ObjectId;
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: [];
}

const reactionSchema = new Schema<IReaction>(
    {
      reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp,
      },
    },
    {
      toJSON: {
        getters: true,
      },
      _id: false, // Prevents Mongoose from automatically creating an _id field for subdocuments
    }
  );

  const thoughtSchema = new Schema<IThought>(
    {
      thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: Date) => timestamp,
      },
      username: {
        type: String,
        required: true,
        ref: 'User', // Refers to the User model but stores as a string
      },
      reactions: [reactionSchema], // Embedded subdocuments
    },
    {
      toJSON: {
        getters: true,
        virtuals: true,
      },
      id: false,
    }
  );
  
  // Virtual property to count reactions
  thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
  });
  
  // Initialize the Thought model
  const Thought = model<IThought>('Thought', thoughtSchema);
  
  export default Thought;