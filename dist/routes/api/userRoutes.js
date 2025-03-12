import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, deleteUser, addFriend, removeFriend } from '../../controllers/userController.js';
// /
router.route('/').get(getUsers).post(createUser);
// /_id
router.route('/:_id')
    .get(getSingleUser)
    .delete(deleteUser);
// /:_id/friends/:_id
router.route('/:_id/friends/:_id')
    .post(addFriend)
    .delete(removeFriend);
export default router;
