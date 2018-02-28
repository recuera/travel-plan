const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TripVisit = require("../models/Trip-Visit");
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(e => {
    console.log(e);
  });
const tripvisits = [
  {
    trip_id: "5a969bb081ba3d4d00ec3c8c",
    visit_id: "5a96925071c6794c531f2f41",
    day_pos: 1,
    start: new Date("Jun 24 2018 13:00"),
    opening: [
      {
        opening: "10:00:00",
        closing: "22:30:00"
      },
      {
        opening: "10:00:00",
        closing: "22:30:00"
      },
      {
        opening: "10:00:00",
        closing: "22:30:00"
      },
      {
        opening: "10:00:00",
        closing: "22:30:00"
      },
      {
        opening: "10:00:00",
        closing: "22:30:00"
      },
      {
        opening: "10:00:00",
        closing: "22:30:00"
      }
    ]
  },
  {
    trip_id: "5a969bb081ba3d4d00ec3c8c",
    visit_id: "5a96925071c6794c531f2f3f",
    day_pos: 3,
    start: new Date("Jun 26 2018 13:00"),
    opening: [
      {
        opening: "09:00:00",
        closing: "00:00:00"
      },
      {
        opening: "09:00:00",
        closing: "00:00:00"
      },
      {
        opening: "09:00:00",
        closing: "00:00:00"
      },
      {
        opening: "09:00:00",
        closing: "00:00:00"
      },
      {
        opening: "09:00:00",
        closing: "00:00:00"
      },
      {
        opening: "09:00:00",
        closing: "00:00:00"
      }
    ]
  }
];
TripVisit.collection.drop();

TripVisit.create(tripvisits, (err, docs) => {
  if (err) {
    throw err;
  }

  console.log(`${tripvisits.length} trips-visits created`);
});