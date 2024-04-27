import mongoose, { HydratedDocument } from "mongoose";
import { IAuction, Bid } from "../auction/AuctionTypes";
import { IDatabase } from "./IDatabase";
import { AuctionModel } from "./Models";

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

  async SaveBid(auction: IAuction) {
    const auctionDocument: HydratedDocument<IAuction> = new AuctionModel({
      productId: auction.productId,
      productName: auction.productName,
      startingPrice: auction.startingPrice,
      acceptedPrice: auction.acceptedPrice,
      bidAccepted: auction.bidAccepted,
      bids: auction.bids,
    });

    const insertBid = await AuctionModel.create(auctionDocument);

    return insertBid;
  }

  async GetHighestBid(productId: string) {
    const findProduct = AuctionModel.findById(productId);
    findProduct.sort({ price: -1 }).limit(1);

    return findProduct;
  }
}
