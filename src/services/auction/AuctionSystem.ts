import { Database } from "../db/Database";
import { ClassTimer } from "../timer/Timer";
import { Bid, BiddingState, IAuction } from "./AuctionTypes";
import { IAuctionSystem } from "./IAuctionSystem";

export class AuctionSystem implements IAuctionSystem {
  private database: Database;
  private timer: ClassTimer;

  constructor(database: Database, timer: ClassTimer) {
    this.database = database;
    this.timer = timer;
  }

  HighestBid = async (productId: string) => {
    if (!productId) return null;

    const highestBid = await this.database.GetHighestBid(productId);

    if (!highestBid) return null;

    return highestBid;
  };

  CreateAuction = async (auction: IAuction): Promise<IAuction | null> => {
    if (!auction.productId) return null;

    const createAuction = await this.database.CreateAuction(auction);

    this.timer.startTimer();

    return createAuction;
  };

  IncomingBid = async (bid: Bid): Promise<Bid | null | BiddingState> => {
    if (this.timer.getCompleted()) return BiddingState.FINISHED;

    if (!bid.productId) return null;

    await this.database.SaveBid(bid);

    return bid;
  };
}
