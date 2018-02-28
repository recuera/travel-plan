const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = 5;
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(e => {
    console.log(e);
  });

const salt = bcrypt.genSaltSync(bcryptSalt);
const password = "tochunga";
const encryptedPass = bcrypt.hashSync(password, salt);

const users = [
{
  username: "paula@whatever.com",
  name: "Paula M",
  password: encryptedPass,
},
{
  username: "fernano@whatever.com",
  name: "Fer OR",
  password: encryptedPass,
},
{
  username: "pilar @whatever.com",
  name: "Pili",
  password: encryptedPass,
},
]

User.collection.drop();

User.create(users, (err, user) => {
  if (err) {
    throw err;
  }
  console.log(user);
});
