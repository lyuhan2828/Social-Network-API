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
  // .post(createUser);

router
  .route('/')
  .get(getAllUser)
  .post(createUser)
  // .delete(deleteUser);

// router
//   .route('/')
//   .post(createUser)

module.exports = router;