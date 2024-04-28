import mongoose, { HydratedDocument } from "mongoose";
import { Bid, IAuction } from "../auction/AuctionTypes";
import { IDatabase } from "./IDatabase";
import { AuctionModel } from "./Models";

export class Database implements IDatabase {
  async Connect(): Promise<void | Error> {
    try {
      const connection = await mongoose.connect(
        "mongodb://mongo:27017/auction",
        {
          user: process.env.MONGODB_USER,
          pass: process.env.MONGODB_PASSWORD,
          authSource: "admin",
        }
      );
      if (connection) {
        console.log("Database Connected Successfully...");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.log("Error while connecting database", error);
      return error;
    }
  }

  async SaveBid(bid: Bid) {
    console.log("Saving bid", bid);

    const insertBid = await AuctionModel.findOneAndUpdate(
      { productId: bid.productId },
      {
        $push: {
          bids: [
            {
              price: bid.price,
              bidId: bid.bidId,
              productId: bid.productId,
            },
          ],
        },
      },
      {
        upsert: true,
      }
    );

    return insertBid;
  }

  async CreateAuction(auction: IAuction) {
    const auctionDocument: HydratedDocument<IAuction> = new AuctionModel({
      productId: auction.productId,
      productName: auction.productName,
      startingPrice: auction.startingPrice,
      acceptedPrice: auction.acceptedPrice,
      bidAccepted: auction.bidAccepted,
      bids: auction.bids,
    });

    const insertAuction = await AuctionModel.findOneAndUpdate(
      { productId: auction.productId },
      { $set: auctionDocument },
      {
        upsert: true,
      }
    );

    return insertAuction;
  }

  async GetHighestBid(productId: string) {
    const product = await AuctionModel.where("productId").equals(productId);
    const bids = product[0].bids.sort((a, b) => (a.price > b.price ? -1 : 1));
    return bids[0];
  }
}
