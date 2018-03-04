const express = require("express");
const router = express.Router();
const Trip = require("../../models/Trip");
const User = require("../../models/User");
const CITIES = require("../../models/CITIES");
const COUNTRIES = require("../../models/COUNTRIES");
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


router.get("/", (req, res, next) => {
  Trip.find({ author_id: res.locals.user._id }).exec((err, trips) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(trips);
  });
});

router.post("/", (req, res, next) => {
  
  let dates = [];
  let countryName = req.body.country;
  let countryID = COUNTRIES[countryName];
  let cityName = req.body.city;
  let cityID = CITIES[countryID][cityName];
  //console.log(CITIES[countryID])
  console.log(req.body)
  const newTrip = new Trip({
    dates: getDates(req.body.start, req.body.end),
    author_id: req.user.id,
    city: {
      name: req.body.city,
      id: cityID
    }
  });

  const saveTrip = (trip) => {
    trip.save(err => {
      if (err) {
        return res.status(500).json(err);
      }
      if (trip.errors) {
        return res.status(400).json(trip);
      }
      return res.status(200).json(trip);
    });
  };

  Trip.findOne({ "city.id": cityID }, { img: 1, _id: 0 })
    .then(data => {
      console.log(data)
      console.log(cityID)
      if (data) {
        newTrip.img = data.img;
        saveTrip(newTrip)
      } else {
        console.log("ADIOS")
        axios
          .get(`https://api.sygictravelapi.com/1.0/en/places/city:${cityID}`, {
            headers: { "x-api-key": APIKEY }
          })
          .then(function(response) {

            let imgURL = response.data.data.place.main_media;

            if (imgURL != null) {
              imgURL = imgURL.media[0].url;
              newTrip.img = imgURL.replace("media/", "media/800x600/");
            }
            saveTrip(newTrip)
          }).catch(function(e) {
            console.log(e);
            return res.json(e);
          });;
      }
    })
    .catch(function(e) {
      console.log(e);
      return res.json(e);
    });
});

router.get("/:id", (req, res, next) => {
  Trip.findById(req.params.id).exec((err, trips) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(trips);
  });
});

router.get("delete/:id", (req, res, next) => {
  TripVisit.findByIdAndRemove(req.params.id)
  .then(() => {res.status(200).json({ message: 'removed' })})
  .catch(e => res.status(500).json(e))
});

module.exports = router;
