import { Database } from "../db/Database";
import { Auction, Bid } from "./AuctionTypes";
import { IAuctionSystem } from "./IAuctionSystem";

//
// Create Auction with time limit and starting price
// Incoming bids
// Persist bid to db
// Once time limit expire select highest bid

export class AuctionSystem implements IAuctionSystem {
  private database: Database;

  constructor(database: Database) {
    this.database = this.database;
  }

  HighestBid(): string {
    throw new Error("Method not implemented.");
  }

  CreateAuction = (auction: Auction): Auction | null => {
    if (!auction.productName) return null;

    return auction;
  };

  IncomingBid = (bid: Bid): Bid | null => {
    if (!bid.price) return null;

    return bid;
  };
}
