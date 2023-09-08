const User = require("../models/users");

async function handleAllUsers(req, res) {
  const users = await User.find({});
  return res.json(users);
}

async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).json({ error: "User Not Found" });
  return res.status(200).json(user);
}

async function updateById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    lastName: "yadav",
  });
  return res.status(201).json({ status: "success" });
}

async function deletById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  return res.status(201).json({ status: "success" });
}

async function createNewUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "all field required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log(result);
  return res.status(201).json({
    status: "success",
  });
}

module.exports = {
  handleAllUsers,
  getUserById,
  updateById,
  deletById,
  createNewUser,
};
