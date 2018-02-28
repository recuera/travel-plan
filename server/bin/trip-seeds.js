const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Trip = require("../models/Trip");
const User = require("../models/User");
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(e => {
    console.log(e);
  });
const trips = [
  {
    dates: [
       new Date("Jun 23 2018"),
       new Date("Jun 24 2018"),
       new Date("Jun 25 2018"),
       new Date("Jun 26 2018"),
       new Date("Jun 27 2018"),
       new Date("Jun 28 2018"),
    ],
    author_id: "5a96867d17c0d94ac1e1e6d9",
    city: {
      name: "Paris",
      id: 14
    },
    img:
      "https://media-cdn.sygictraveldata.com/media/612664395a40232133447d33247d3831363732333136.jpg"
  },
  {
    start: new Date("Jul 27 2018"),
    end: new Date("Aug 3 2018"),
    dates: [
      new Date("Jul 27 2018"),
      new Date("Jul 28 2018"),
      new Date("Jul 29 2018"),
      new Date("Jul 30 2018"),
      new Date("Jul 31 2018"),
      new Date("Aug 1 2018"), 
      new Date("Aug 2 2018"), 
      new Date("Aug 3 2018"), 
    ],
    author_id: "5a96867d17c0d94ac1e1e6d9",
    city: {
      name: "New York",
      id: 186
    },
    img:
      "https://media-cdn.sygictraveldata.com/media/612664395a40232133447d33247d3831363732333139.jpg"
  }
];
Trip.collection.drop();

Trip.create(trips, (err, docs) => {
  if (err) {
    throw err;
  }

  console.log(`${trips.length} trips created`);
});
