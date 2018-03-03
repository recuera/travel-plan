const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const TripVisit = require("../../models/Trip-Visit");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");


router.put("/save", (req, res, next) => {
  const updateVisit = {
    day_pos: req.body.dayPos
  };

  TripVisit.findByIdAndUpdate(req.body.visitID, updateVisit,(e, visit) => {
    if (e) {
      return res.json(e);
    }
  });
})
  
router.get("/:id/:day", (req, res, next) => {
  let tripID = req.params.id
  let dayPos = -1

  if (req.params.day != "undefined") {
    dayPos = req.params.day;
  }
  TripVisit.find({"trip_id":tripID, day_pos: dayPos}).populate({ path: "visit_id" }).then(visits => {
    return res.json(visits);
  }).catch(e => res.json(e));
});

router.get("/search/:cityID/:place", (req, res, next) => {
  let cityID = req.params.cityID;
  let place = req.params.place;
  axios.get(`https://api.sygictravelapi.com/1.0/en/places/list?parents=city:${cityID}&query=${place}&limit=3`, {
            headers: { "x-api-key": APIKEY }
          }).then(function(response) {
            console.log(response.data.data.places)
            return res.json(response.data.data.places)
          }).catch(function(e) {
            console.log(e);
            return res.json(e);
          });;
  
})

module.exports = router;
