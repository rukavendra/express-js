const express = require("express");
const router = express.Router();
const {
  handleAllUsers,
  getUserById,
  updateById,
  deletById,
  createNewUser,
} = require("../controllers/users");


//Middleware
router.use(express.urlencoded({ extended: false }));

router.route("/")
.get(handleAllUsers)
.post(createNewUser)


// Dynamic content && grouping of req

router.route("/:id").get(getUserById).patch(updateById).delete(deletById);


module.exports = router;
