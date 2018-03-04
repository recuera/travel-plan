const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const TripVisit = require("../../models/Trip-Visit");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");

router.post("/save", (req, res, next) => {
  //console.log(req.body)
  const { tripID, cityID, visitID, visitData } = req.body;
  Visit.findOne({ place_id: visitID })
    .then(visit => {
      if (!visit) {
        console.log("this visit does not exist (yet!)");

        const newVisit = new Visit({
          place_id: visitID,
          city_id:cityID,
          title: visitData.name,
          duration: visitData.duration,
          img: visitData.thumbnail_url,
          location: visitData.location
        });

        console.log(newVisit)

        newVisit.save(err => {
          if (err) {
            return res.status(500).json(err);
          }
          if (newVisit.errors) {
            return res.status(400).json(newVisit);
          }
          return res.status(200).json(newVisit);
        });

      } else {
        console.log(visit);
      }
      return res.json(visit);
    })
    .catch(e => res.json(e));
  // TripVisit.findByIdAndUpdate(req.body.tripVisitID, updateVisit,(e, visit) => {
  //   if (e) {
  //     return res.json(e);
  //   }
  // });
});

router.put("/update", (req, res, next) => {
  const updateVisit = {
    day_pos: req.body.dayPos
  };
  TripVisit.findByIdAndUpdate(req.body.tripVisitID, updateVisit, (e, visit) => {
    if (e) {
      return res.json(e);
    }
  });
});

router.get("/:id/:day", (req, res, next) => {
  let tripID = req.params.id;
  let dayPos = -1;

  if (req.params.day != "undefined") {
    dayPos = req.params.day;
  }
  TripVisit.find({ trip_id: tripID, day_pos: dayPos })
    .populate({ path: "visit_id" })
    .then(visits => {
      return res.json(visits);
    })
    .catch(e => res.json(e));
});

router.get("/search/:cityID/:place", (req, res, next) => {
  let cityID = req.params.cityID;
  let place = req.params.place;
  console.log(req.params);
  axios
    .get(
      `https://api.sygictravelapi.com/1.0/en/places/list?parents=city:${cityID}&query=${place}&limit=3`,
      {
        headers: { "x-api-key": APIKEY }
      }
    )
    .then(function(response) {
      console.log(response.data.data.places);
      return res.json(response.data.data.places);
    })
    .catch(function(e) {
      console.log(e);
      return res.json(e);
    });
});

module.exports = router;
