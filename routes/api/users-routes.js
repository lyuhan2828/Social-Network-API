const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  } = require('../../controllers/user-controller');

router
  .route('/')
  .get()
  .post();

router
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = router;