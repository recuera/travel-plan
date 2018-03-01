const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");


const getDates = function(startDate, endDate) {
  let dates = [];

  let currDate = moment(startDate).startOf("day");
  let lastDate = moment(endDate).startOf("day");
  do {
    dates.push(currDate.clone());
  } while (currDate.add(1, "days").diff(lastDate) < 1);
  return dates;
};

  
router.get("/:id", (req, res, next) => {
  console.log(req.params.id)
  Visit.find({city_id:req.params.id}).exec((err, visits) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(visits);
  });
});

module.exports = router;
