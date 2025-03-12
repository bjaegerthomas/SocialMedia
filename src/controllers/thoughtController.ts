import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

  // get all thoughts
  export const getThoughts = async (_req: Request, res: Response) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // get a single thought by id
  export const getSingleThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOne({ _id: req.params._id })
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
  
      res.json(Thought);
      return; 
    } catch (err) {
      res.status(500).json(err);
    }
  
    return;
  }

  // create a new thought
  export const createThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        });
      }
  
      res.json('Created the thought 🎉');
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  
    return;
  }

  // update a thought
  export const updateThought = async(req: Request, res: Response) => {
    try {
      const thought =
        await Thought.findOneAndUpdate(
          { _id: req.params._id},
          { $set: req.body },
          { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      res.json(thought);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  // delete a thought
  export const deleteThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params._id });
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }
  
      const user = await User.findOneAndUpdate(
        { thoughts: req.params._id },
        { $pull: { thoughts: req.params._id } },
        { new: true }
      );
  
      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought created but no user with this id!' });
      }
  
      res.json({ message: 'Thought successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  
    return; 
  }

    // Add a thought reaction
    export const addThoughtReaction = async (req: Request, res: Response) => {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params._id },
          { $addToSet: { reactions: { responses: req.body } }},
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    }
  
    // Remove thought reaction
    export const removeThoughtReaction = async (req: Request, res: Response) => {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params._id },
          { $pull: { reactions: { reactionId: req.params._id } } },
          { runValidators: true, new: true }
        )
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    }
