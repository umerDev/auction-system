import mongoose, { model, Model } from "mongoose";
import { IAuction } from "../auction/AuctionTypes";

const Schema = mongoose.Schema;

type auctionModel = Model<IAuction>;

const auctionSchema = new Schema<IAuction, auctionModel>({
  productName: { type: String },
  productId: { type: String },
  startingPrice: { type: Number },
  acceptedPrice: { type: Number },
  timeLimit: { type: Date },
  bidAccepted: { type: Boolean },
  bids: {
    type: [
      {
        bidId: String,
        price: Number,
      },
    ],
  },
});

export const AuctionModel: auctionModel = model<IAuction, auctionModel>(
  "auction",
  auctionSchema
);
