const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tripVisitSchema = new Schema(
  {
    visit_id: { 
      type: Schema.Types.ObjectId, 
      ref: "Visit" 
    },
    trip_id: { 
      type: Schema.Types.ObjectId, 
      ref: "Visit" 
    },
    day_pos: { 
      type: Number, 
      req: "True" 
    },
    start: { 
      type: String, required: true 
    },
    opening: {
      type: Array,
      required: true
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const TripVisit = mongoose.model("TripVisit", tripVisitSchema);
module.exports = TripVisit;
