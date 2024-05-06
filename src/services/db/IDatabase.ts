import { AuctionState, Bid, IAuction } from "../auction/AuctionTypes";
import { MongoConfig } from "../config/Config";

export interface IDatabase {
  SaveBid(bid: Bid): Promise<unknown>;
  GetHighestBid(productName: string): Promise<Bid>;
  Connect(mongoConfig: MongoConfig): Promise<void | Error>;
  SetAcceptedPrice(productId: string, acceptedPrice: number): Promise<number>;
  CreateAuction(auction: IAuction): Promise<AuctionState>;
  GetStartingPrice(productId: string): Promise<number>;
}
