import User from '../models/User.js';
import { Request, Response } from 'express';

  // get all users
  export const getUsers = async(_req: Request, res: Response) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get a single user by id
  export const getSingleUser = async(req: Request, res: Response) => {
    try {
      const user = await User.findOne({ _id: req.params._id })
        .select('-__v');

      if (!user) {
         res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // create a new user
  export const createUser = async(req: Request, res: Response) => {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // update a user
  export const updateUser = async(req: Request, res: Response) => {
    try {
      const user =
        await User.findOneAndUpdate(
          { _id: req.params._id},
          { $set: req.body },
          { runValidators: true, new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json(user);
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      return; 
    }
  }

  // delete a user
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const friend = await User.findOneAndDelete({ _id: req.params._id });
  
      if (!friend) {
        return res.status(404).json({ message: 'No user with this id!' });
      }
  
      res.json({ message: 'Friend successfully deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  
    return; 
  }

    // Add a friend
    export const addFriend = async (req: Request, res: Response) => {
      try {
        const friend = await User.findOneAndUpdate(
          { _id: req.params._id },
          { $addToSet: { responses: req.body._id } },
          { runValidators: true, new: true }
        );
  
        if (!friend) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json({ message: 'Friend successfully added!' });
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    }
  
    // Remove a friend
    export const removeFriend = async (req: Request, res: Response) => {
      try {
        const friend = await User.findOneAndUpdate(
          { _id: req.params._id },
          { $pull: { friends: { responseId: req.params._id } } },
          { runValidators: true, new: true }
        )
  
        if (!friend) {
          return res.status(404).json({ message: 'No user with this id!' });
        }
  
        res.json({ message: 'Friend successfully deleted!' });
        return;
      } catch (err) {
        res.status(500).json(err);
        return;
      }
    }
