const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    // deleteUser
  } = require('../../controller/user-controller');

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  // .post(createUser);

router
  .route('/')
  .get(getAllUser)
  .post(createUser)
  // .delete(deleteUser);


module.exports = router;