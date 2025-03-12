import { Router } from 'express';
const router = Router();
import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addThoughtReaction, removeThoughtReaction } from '../../controllers/thoughtController.js';
// /
router.route('/').get(getThoughts).post(createThought);
// /:_id
router.route('/:_id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
// /:_id/reactions
router.route('/:_id/reactions').post(addThoughtReaction);
router.route('/:_id/reactions/:reactionId').delete(removeThoughtReaction);
export default router;
