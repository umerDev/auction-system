import mongoose, { HydratedDocument } from "mongoose";
import { AuctionState, Bid, IAuction } from "../auction/AuctionTypes";
import { IDatabase } from "./IDatabase";
import { AuctionModel } from "./Models";
import { MongoConfig } from "../config/Config";

export class Database implements IDatabase {
  async Connect(mongoConfig: MongoConfig): Promise<void | Error> {
    try {
      const connection = await mongoose.connect(mongoConfig.MONGO_URL, {
        user: mongoConfig.MONGO_USER,
        pass: mongoConfig.MONGO_PASSWORD,
        authSource: "admin",
      });
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

    const upsert = await AuctionModel.findOneAndUpdate(
      { productId: auction.productId },
      { $set: auctionDocument },
      {
        upsert: true,
      }
    );

    if (upsert) {
      return AuctionState.CREATED;
    }
    return AuctionState.FAILED;
  }

  async GetStartingPrice(productId: string) {
    const product = await AuctionModel.where("productId").equals(productId);
    const startingPrice = product[0].startingPrice;
    return startingPrice;
  }

  async GetHighestBid(productId: string) {
    const product = await AuctionModel.where("productId").equals(productId);
    const bids = product[0].bids.sort((a, b) => (a.price > b.price ? -1 : 1));
    return bids[0];
  }

  async SetAcceptedPrice(productId: string, acceptedPrice: number) {
    await AuctionModel.findOneAndUpdate(
      { productId: productId },
      {
        $set: {
          acceptedPrice: acceptedPrice,
        },
      },
      {
        upsert: true,
      }
    );

    return acceptedPrice;
  }
}
