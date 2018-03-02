const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const TripVisit = require("../../models/Trip-Visit");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");


router.put("/save", (req, res, next) => {
  console.log(req.body)
  const updateVisit = {
    day_pos: req.body.dayPos
  };

  TripVisit.findOneAndUpdate({"visit_id":req.body.visitID, "trip_id": req.body.tripID}, updateVisit,(e, visit) => {
    if (e) {
      return res.json(e);
    }
    console.log(visit)
  });
})
  
router.get("/:id", (req, res, next) => {
  let tripID = req.params.id
  TripVisit.find({"trip_id":tripID}).populate({ path: "visit_id" }).then(visits => {
    console.log(visits)
    return res.json(visits);
  }).catch(e => res.json(e));
});

module.exports = router;
