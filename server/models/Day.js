const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Trip = require("./Trip");

const daySchema = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    trip_id: {
      type: Schema.Types.ObjectId,
      ref: "Trip",
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Day = mongoose.model("Day", daySchema);
module.exports = Day;
