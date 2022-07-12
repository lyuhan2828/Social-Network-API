const { Thoughts, User } = require('../models')

const thoughtController = { 
// get all thoughts
getThoughts( req, res) {
    Thoughts.find() 
    .sort({ createdAt: -1 })
    .then((dbThoughtData) => {
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
},
getSingleThought(req, res) {
    Thoughts.findOne({_id: req.params.Thoughts.id}) 
    .then((dbThoughtData) => {
        if(!dbThoughtData){
            return res.status(404).json({message: 'No thought with this id exist'})
        }
        res.json(dbThoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
},
createThought(req, res) {
    Thoughts.create(req.body)
    .then((dbThoughtData) => {
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: dbThoughtData._id}},
            {new: true}
          );
    })
    .then((dbUserData) => {
    if(!dbUserData){
        return res.status(404).json({message: 'Thought created, but no user is exist'})
    }
    res.json({message: 'Thought successfully created'});
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
},
// update a thought findOneAndUpdate
// delete a thought findOneAndRemove
// remove thought Id from Usersthought field findOneAndUpdate
// add a reaction to a thought findOneAndUpdate
//  remove reaction from a thought findOneAndUpdate
}

module.exports = thoughtController;