import { Database } from "../db/Database";
import { IAuction } from "./AuctionTypes";
import { IAuctionSystem } from "./IAuctionSystem";

export class AuctionSystem implements IAuctionSystem {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async HighestBid(productId: string) {
    if (!productId) return null;

    const highestBid = await this.database.GetHighestBid(productId);

    if (!highestBid) return null;

    return highestBid;
  }

  CreateAuction = (auction: IAuction): IAuction | null => {
    if (!auction.productName) return null;

    return auction;
  };

  IncomingBid = async (auction: IAuction): Promise<IAuction | null> => {
    if (!auction.productId) return null;

    await this.database.SaveBid(auction);

    return auction;
  };
}
