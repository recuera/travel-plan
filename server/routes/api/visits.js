const express = require("express");
const router = express.Router();
const Visit = require("../../models/Visit");
const TripVisit = require("../../models/Trip-Visit");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");

router.post("/save", (req, res, next) => {
  const { tripID, cityID, dayPos, dateRange, visitID, visitData } = req.body;

  const saveTripVisit = tripVisit => {
    tripVisit.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      if (tripVisit.errors) {
        return res.status(400).json(tripVisit);
      }
      return res.status(200).json(tripVisit);
    });
  };

  axios
    .get(`https://api.sygictravelapi.com/1.0/en/places/${visitID}/opening-hours?from=${dateRange[0]}&to=${dateRange[1]}`,
      { headers: { "x-api-key": APIKEY } }
    )
    .then(response => {

      let newTripVisit = new TripVisit({
        trip_id: tripID,
        day_pos: dayPos
      });

      newTripVisit.opening = Object.values(response.data.data.opening_hours);
     
      Visit.findOne({ place_id: visitID })
        .then(visit => {

          if (!visit) {

            const newVisit = new Visit({
              place_id: visitID,
              city_id: cityID,
              title: visitData.name,
              duration: visitData.duration,
              img: visitData.thumbnail_url,
              location: visitData.location
            });

            newVisit.save(err => {
              if (err) {
                return res.status(500).json(err);
              }
              if (newVisit.errors) {
                return res.status(400).json(newVisit);
              }
              newTripVisit.visit_id = newVisit._id
              saveTripVisit(newTripVisit)
            });

          } else {
            newTripVisit.visit_id = visit._id;
            saveTripVisit(newTripVisit)
          }
        })
        .catch(function(e) {
          return res.json(e);
        });
    })
    .catch(e => res.json(e));
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

router.get("/delete/:id", (req, res, next) => {
  console.log("ENTRO")
  TripVisit.findByIdAndRemove(req.params.id)
  .then(() => {res.status(200).json({ message: 'removed' })})
  .catch(e => {
    console.log(e)
    res.status(500).json(e)
  })
});

router.get("/search/:cityID/:place", (req, res, next) => {
  let cityID = req.params.cityID;
  let place = req.params.place;
  console.log(req.params);
  axios
    .get(
      `https://api.sygictravelapi.com/1.0/en/places/list?parents=city:${cityID}&query=${place}&limit=1`,
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

router.get("/getTop/:cityID", (req, res, next) => {
  let cityID = req.params.cityID;

  axios
    .get(
      `https://api.sygictravelapi.com/1.0/en/places/list?parents=city:${cityID}&categories=sightseeing&levels=poi&limit=10`,
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

router.get("/get/:id/:day", (req, res, next) => {
  let tripID = req.params.id;
  let dayPos = req.params.day;

  TripVisit.find({ trip_id: tripID, day_pos: dayPos })
    .populate({ path: "visit_id" })
    .then(visits => {
      return res.json(visits);
    })
    .catch(e => res.json(e));
});

module.exports = router;
