const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const TripVisit = require("../../models/Trip-Visit");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");


router.put("/save", (req, res, next) => {
  console.log("SAVE")
  console.log(req.body)
  const updateVisit = {
    day_pos: req.body.dayPos
  };

  TripVisit.findByIdAndUpdate(req.body.visitID, updateVisit,(e, visit) => {
    if (e) {
      return res.json(e);
    }
    console.log(visit)
  });
})
  
router.get("/:id/:day", (req, res, next) => {
  let tripID = req.params.id
  let dayPos = -1

  if (req.params.day != "undefined") {
    dayPos = req.params.day;
  }
  TripVisit.find({"trip_id":tripID, day_pos: dayPos}).populate({ path: "visit_id" }).then(visits => {
    console.log(visits)
    return res.json(visits);
  }).catch(e => res.json(e));
});

module.exports = router;
