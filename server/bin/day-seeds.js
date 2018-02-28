const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Day = require("../models/Day");
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(e => {
    console.log(e);
  });
const days = [
  {
    date: new Date("Jun 23 2018"),
    trip_id: "5a968bcfd5539c4b68f912f3",
    position: 0
  },
  {
    date: new Date("Jun 23 2018"),
    trip_id: "5a968bcfd5539c4b68f912f3",
    position: 0
  },

];
Day.collection.drop();

Day.create(days, (err, docs) => {
  if (err) {
    throw err;
  }

  console.log(`${trips.length} trips created`);
});
