import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { getRandomUser, getRandomThought, getRandomReaction } from './data.js';
console.time('seeding');
connection.once('open', async () => {
    try {
        console.log('Connected to MongoDB. Seeding data...');
        // Drop existing collections
        await User.deleteMany({});
        await Thought.deleteMany({});
        // Generate users
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = getRandomUser();
            users.push(user);
        }
        // Insert users and store their ObjectIds
        const insertedUsers = await User.insertMany(users);
        // Generate thoughts and associate them with users
        const thoughts = [];
        for (const user of insertedUsers) {
            const numThoughts = Math.floor(Math.random() * 2) + 1; // Generate 1 or 2 thoughts for each user
            for (let i = 0; i < numThoughts; i++) {
                const thought = getRandomThought(user.username);
                // Generate 1-2 reactions for each thought
                const numReactions = Math.floor(Math.random() * 2) + 1; // 1 or 2 reactions
                const reactions = [];
                for (let j = 0; j < numReactions; j++) {
                    const reaction = getRandomReaction(user.username);
                    reactions.push(reaction);
                }
                // Add reactions to the thought
                thought.reactions = reactions;
                // Push the thought with user reference to the thoughts array
                thoughts.push({ ...thought, userId: user._id });
            }
        }
        // Insert thoughts into MongoDB
        const insertedThoughts = await Thought.insertMany(thoughts);
        // Update users with their thought ObjectIds
        for (const thought of insertedThoughts) {
            await User.findOneAndUpdate({ username: thought.username }, { $push: { thoughts: thought._id } });
        }
        // Assign friends by mapping usernames to ObjectIds
        for (const user of insertedUsers) {
            // Get possible friends, excluding the user itself
            const possibleFriends = insertedUsers.filter(u => u._id.toString() !== user._id.toString());
            const numFriends = Math.floor(Math.random() * 3) + 1; // Random number of friends (1-3)
            const friends = possibleFriends.slice(0, numFriends).map(friend => friend._id); // Get their ObjectIds
            // Update the user with friends' ObjectIds
            await User.findByIdAndUpdate(user._id, { $set: { friends } });
        }
        console.log('Seeding complete!');
    }
    catch (error) {
        console.error('Error while seeding:', error);
    }
    finally {
        console.timeEnd('seeding');
        process.exit(0);
    }
});
