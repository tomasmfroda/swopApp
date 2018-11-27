import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const UserDetailsSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    address: {
      firstLineAddress: { type: String },
      secondLineAddress: { type: String },
      city: { type: String },
      country: {
        countryKey: { type: String },
        countryValue: { type: String }
      },
      postcode: { type: String },
      county: { type: String }
    },
    phoneNumber: { type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("UserDetails", UserDetailsSchema);
