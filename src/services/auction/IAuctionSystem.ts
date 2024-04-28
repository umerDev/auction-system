import { IAuction, Bid, BiddingState, AuctionState } from "./AuctionTypes";

export interface IAuctionSystem {
  CreateAuction(auction: IAuction): Promise<AuctionState>;
  IncomingBid(bid: Bid): Promise<Bid | null | BiddingState>;
  HighestBid(productName: string): unknown;
}
