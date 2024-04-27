import mongoose from "mongoose";
import { Bid } from "../auction/AuctionTypes";
import { IDatabase } from "./IDatabase";
import { BidModel } from "./Models";

export class Database implements IDatabase {
  async Connect(): Promise<void | Error> {
    try {
      const connection = await mongoose.connect(
        "mongodb://mongo:27017/auction"
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
    const insertBid = await BidModel.create({
      bidId: bid.bidId,
      price: bid.price,
    });
    return insertBid;
  }

  GetHighestBid(): Bid {
    return {
      bidId: "umer",
      price: 200,
    };
  }
}
