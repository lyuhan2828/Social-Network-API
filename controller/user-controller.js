const { User, Thoughts } = require('../models');

const userController = {
// get all users
getAllUser(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create new User
  createUser(req, res) {
    console.log('getting here')
    User.create(req.body)
    .then((dbUserData) => {
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // Update User
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      {runValidators: true,
      new: true,
    }
    )
    .then((dbUserData) => {
      if(!dbUserData) {
        return res.status(404).json({message: 'No user with this id exist'})
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }

};

module.exports = userController;