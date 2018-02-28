const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User");

const tripSchema = new Schema(
  {
    dates: {
      type: Array,
      required: true
    },
    author_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    city: {
      name: { 
        type: String, 
        required: true 
      },
      id: { 
        type: Number, 
        required: true 
      }
    },
    img: {
      type: String,
      required: true, 
      default: "assets/img/map.jpg"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Trip = mongoose.model("Trip", tripSchema);
module.exports = Trip;
