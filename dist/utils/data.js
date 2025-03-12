import { Types } from 'mongoose';
const possibleNames = [
    'Jonny Rocket', 'Sarah Swill', 'Brody Labanca', 'Shirliene Tuck', 'Tarik Davis',
    'Jamilla Smith', 'Jared Thompson', 'Kara Ackerton', 'Ellen Bell', 'Edwardo Gutierrez',
    'Zhou Xing', 'Myliene Perd', 'Ben Wade', 'Miung Lee', 'Abdul Aziz', 'Paul Kent',
    'Janiah Randall', 'Kelsey Rogers', 'Akwafina Minaj', 'Richard Dell', 'Courtney Parker',
];
const possibleThoughts = [
    'Why is ‘abbreviation’ such a long word?', 'I wonder if my dog thinks I have a job fetching food all day.',
    'The best ideas come to me in the shower, and I always forget them.', 'If I had a dollar for every time I procrastinated… I’d collect it later.',
    'Sleep is like a time machine to breakfast.', 'Do fish ever get thirsty?',
    'Life would be easier if background music played when I made a decision.', 'Nothing makes me more suspicious than a ‘Trust Me’ sign.',
    'We never really stop clapping; the intervals just get longer.', 'Would Lightning McQueen get car insurance or life insurance?',
];
const possibleReactions = [
    '😂 This made my day!', '🤯 Whoa, I never thought of that!', '🤣 Too real!', '👀 Now I can\'t unthink this...',
    '🤡 You might be onto something, or you might need sleep.', '🔥 Pure genius!', '🤔 Hmm... now I have questions.',
    '💀 My brain just short-circuited.', '😭 This is the funniest thing I’ve read today.', '🙄 Someone overthinking at 3 AM again...',
    '😆 That’s deep… in a very weird way.', '🤦‍♂️ Not this again!', '💡 Adds to list of things to ponder at 2 AM',
    '👏 Give this person an award!', '😱 I feel like I just unlocked a new level of thinking.',
    '💀 The Lightning McQueen one just wrecked me.', '😂 This is going straight to my group chat.',
    '🧐 The government is probably watching us for thoughts like this.', '😳 I suddenly have an existential crisis.',
    '👌 Well played, philosopher of the internet.',
];
// Get a random item from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
/**
 * Generates a random user object.
 * The `thoughts` and `friends` fields are left empty and will be populated in seed.ts.
 */
let generatedUsernames = new Set(); // Store already generated usernames
const getRandomUser = () => {
    let username;
    // Keep generating a username until it's unique
    do {
        username = getRandomArrItem(possibleNames);
    } while (generatedUsernames.has(username)); // Check if username is already generated
    generatedUsernames.add(username); // Add the username to the set
    return {
        userId: new Types.ObjectId(),
        username,
        email: `${username.toLowerCase().replace(/\s/g, '')}@example.com`,
        thoughts: [],
        friends: [],
    };
};
/**
 * Generates a random thought object.
 * The `username` field is passed in from seed.ts to ensure association with a user.
 */
const getRandomThought = (username) => ({
    thoughtId: new Types.ObjectId(),
    thoughtText: getRandomArrItem(possibleThoughts),
    createdAt: new Date(),
    username, // The username will match an existing user
    reactions: [], // Empty array to be filled later with reactions
});
const getRandomReaction = (username) => ({
    reactionId: new Types.ObjectId(),
    reactionBody: getRandomArrItem(possibleReactions),
    username,
    createdAt: new Date(),
});
export { getRandomUser, getRandomThought, getRandomReaction };
