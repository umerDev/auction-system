import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BidSchema = new Schema({
  price: { type: Number },
  bidId: { type: String },
});

export const BidModel = mongoose.model("bid", BidSchema, "bids");
