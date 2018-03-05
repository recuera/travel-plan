const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitSchema = new Schema(
  {
    place_id: {
      type: String,
      required: true
    },
    city_id:{
      type: Number,
      required: true
    },
    title: { 
      type: String, 
      required: true 
    },
    duration: {
      type: Number,
      required: true
    },
    img: {
      type: String,
      required: true,
      default: "assets/img/bokeh.jpg"
    },
    location: {
      lat:{ type: Number, required: true },
      lng:{ type: Number, required: true }
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Visit = mongoose.model("Visit", visitSchema);
module.exports = Visit;
