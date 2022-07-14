const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controller/thought-controller');
// /api/thoughts
router
.route('/')
.get(getThoughts);

// /api/thoughts/:thoughtId
router
.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);
// /api/thoughts/:userId
router
.route('/:userId')
.post(createThought);
// /api/thoughts/:thoughtId/reactions
router
.route('/thoughtId/reactions')
.post(addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReaction);

module.exports = router; 
