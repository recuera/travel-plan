const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Visit = require("../models/Visit")
const { dbURL } = require("../config");

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("Connect to DB");
  })
  .catch(e => {
    console.log(e);
  });
const visits = [
  {
    place_id: "poi:530",
    city_id: 14,
    title: "Eiffel Tower",
    duration: 3600,
    img: "https://media-cdn.sygictraveldata.com/media/poi:530",
    location: {
      lat: 48.858262,
      lng: 2.2944955
    }
  },
  {
    place_id: "poi:529",
    city_id: 14,
    title: "Notre Dame",
    duration: 7200,
    img: "https://media-cdn.sygictraveldata.com/media/poi:529",
    location: {
      lat: 48.8533658,
      lng: 2.3493036
    }
  },
  {
    place_id: "poi:541",
    city_id: 14,
    title: "Triumphal Arch",
    duration: 3600,
    img: "https://media-cdn.sygictraveldata.com/media/poi:541",
    location: {
      lat: 48.8737773,
      lng: 2.2950372
    }
  },
  {
    place_id: "poi:551",
    city_id: 14,
    title: "Champs-Élysées Avenue",
    duration: 3600,
    img: "https://media-cdn.sygictraveldata.com/media/poi:551",
    location: {
      lat: 48.8707572,
      lng: 2.3053312
    }
  },
];
Visit.collection.drop();

Visit.create(visits, (err, docs) => {
  if (err) {
    throw err;
  }

  console.log(`${visits.length} visits created`);
});
