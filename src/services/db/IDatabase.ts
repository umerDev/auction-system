import { AuctionState, Bid, IAuction } from "../auction/AuctionTypes";

export interface IDatabase {
  SaveBid(bid: Bid): Promise<unknown>;
  GetHighestBid(productName: string): Promise<Bid>;
  Connect(): Promise<void | Error>;
  SetAcceptedPrice(productId: string, acceptedPrice: number): Promise<number>;
  CreateAuction(auction: IAuction): Promise<AuctionState>;
  GetStartingPrice(productId: string): Promise<number>;
}
