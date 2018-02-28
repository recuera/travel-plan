const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    img: {
      type: String,
      default:
        "http://iconshow.me/media/images/Mixed/small-n-flat-icon/png/256/user-alt.png"
    },
    location: {
      country: String,
      city: String
    },
    trips: {
      type: Array,
      required: true,
      default: []
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
