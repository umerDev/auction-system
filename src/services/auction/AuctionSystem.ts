import { Database } from "../db/Database";
import { Auction, Bid } from "./AuctionTypes";
import { IAuctionSystem } from "./IAuctionSystem";

//
// Create Auction with time limit and starting price
// Incoming bids
// Persist bid to db
// Once time limit expire select highest bid
//

export class AuctionSystem implements IAuctionSystem {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  HighestBid(): string {
    //get highest bid from db
    return "HighestBid";
  }

  CreateAuction = (auction: Auction): Auction | null => {
    if (!auction.productName) return null;

    return auction;
  };

  IncomingBid = async (bid: Bid): Promise<Bid | null> => {
    if (!bid.price) return null;

    await this.database.SaveBid(bid);

    return bid;
  };
}
