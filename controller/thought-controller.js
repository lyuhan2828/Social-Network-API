const { Thoughts, User } = require('../models')

const thoughtController = {
    // get all thoughts
    getThoughts(req, res) {
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
        Thoughts.findOne({ _id: req.params.Thoughts.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id exist' })
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    createThought(req, res) {
        console.log(req.params)
        Thoughts.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true }
                );
            })
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: 'Thought created, but no user is exist' })
                }
                res.json({ message: 'Thought successfully created' });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // update a thought findOneAndUpdate
    updateThought(req, res) {
      console.log(req.params)
        Thoughts.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            {
                runValidators: true,
                new: true,
            })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id exist' })
                }
                res.json(dbThoughtData)
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

// delete a thought findOneAndRemove
deleteThought({params}, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thoughts with this id exist' })
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(500).json(err));
},
// remove a reaction to thought findOneAndUpdate
removeReaction({params}, res) {
    Thoughts.findByIdAndUpdate({_id: params.thoughtId}, 
        {$pull: {reactions: {reactionId: params.reactionId}}}, 
        {
            new : true
        })
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this id exist'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},

// add a reaction to a thought findOneAndUpdate
addReaction({params, body}, res) {
    console.log(params,body)
    Thoughts.findOneAndUpdate(
        {_id: params.thoughtId}, 
        {$push: {reactions: body}}, 
        { 
            runValidators: true,
            new: true
        })
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                return res.status(404).json({ message: 'No thought with this id exist' })
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
},
//  remove reaction from a thought findOneAndUpdate
deleteReaction({params}, res) {
    Thoughts.findOneAndUpdate(
        {_id: params.thoughtId},
        {$pull: {reactions: {reactionId: params.reactionId}}}, 
        {
            new : true
        })
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts with this particular ID!'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
}
};
module.exports = thoughtController;