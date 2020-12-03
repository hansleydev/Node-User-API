// --------------------- Import Required Modules ---------------------

const mongoose = require("mongoose");

// Instantiate Mongoose Schema

const Schema = mongoose.Schema;

// --------------------- Create Address Schema ---------------------

const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
      default: "",
      trim: true,
      minlength: 10,
      maxlength: 50,
    },

    city: {
      type: String,
      required: true,
      default: "",
      trim: true,
      minlength: 3,
      maxlength: 40,
    },

    state: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Mexico",
        "New York",
        "North Caroina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      default: "Alabama",
      minlength: 4,
      maxlength: 14,
    },

    zip: {
      type: String,
      required: true,
      trim: true,
      default: "",
      minlength: 5,
      maxlength: 5,
    },
  },
  { _id: false }
);

module.exports = AddressSchema;
