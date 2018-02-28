const express = require("express");
const router = express.Router();
const Trip = require("../../models/Trip");
const User = require("../../models/User");

router.get("/", (req, res, next) => {
  Trip.find({ author_id: res.locals.user._id })
      .exec((err, trips) => {
        if (err) {return res.status(500).json(err)}
        return res.status(200).json(trips);
      });
});

module.exports = router;
