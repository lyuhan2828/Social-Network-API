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
  .get(getUserById)
  .post(createUser);

router
  .route('/:id')
  .get(getAllUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;