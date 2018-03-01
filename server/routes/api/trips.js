const express = require("express");
const router = express.Router();
const Trip = require("../../models/Trip");
const User = require("../../models/User");
const CITIES = require("../../models/CITIES");
const COUNTRIES = require("../../models/COUNTRIES");
const moment = require("moment");
const axios = require("axios");
const { APIKEY } = require("../../config");

router.get("/", (req, res, next) => {
  Trip.find({ author_id: res.locals.user._id })
      .exec((err, trips) => {
        if (err) {return res.status(500).json(err)}
        return res.status(200).json(trips);
      });
});
const getDates = function(startDate, endDate) {
  let dates = [];

  let currDate = moment(startDate).startOf('day');
  let lastDate = moment(endDate).startOf('day');
  do {
      dates.push(currDate.clone());
  }
  while(currDate.add(1, 'days').diff(lastDate) < 1)
  return dates;
};

router.post('/', (req, res, next) => {
  console.log("authorised")
  let dates = [];
  let countryName = req.body.country
  let countryID = COUNTRIES[countryName];
  let cityName = req.body.city;
  let cityID = CITIES[countryID][cityName];
  console.log(cityID)
  const newTrip = new Trip({
    dates: getDates(req.body.start, req.body.end),
    author_id: "5a96867d17c0d94ac1e1e6d9", // <-- CAMBIAR ESTO CUANDO TENGA EL SERVICIO
    city: {
      name:req.body.city,
      id: cityID
    }
  });
  // axios
  // .get(`https://api.sygictravelapi.com/1.0/en/places/city:${Cities[cityName].id}`, { 'headers': { 'x-api-key': APIKEY } })
  // .then(function(response) {
  //   if(!response.data){
  //     next();
  //   } else {
  //     console.log(response.data)
  //   }
  // })
  // .catch(function(error) {
  //   console.log(error);
  // });


  
  console.log(newTrip)
  newTrip.save((err) => {
    if (err)              { return res.status(500).json(err); }
    if (newTrip.errors) { return res.status(400).json(newTrip); }

    return res.status(200).json(newTrip);
  });
});

module.exports = router;
