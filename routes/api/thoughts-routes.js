const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thought-controller');
// /api/thoughts
// /api/thoughts/:thoughtId
// /api/thoughts/:thoughtId/reactions
// /api/thoughts/:thoughtId/reactions/:reactionId
module.exports = router; 
