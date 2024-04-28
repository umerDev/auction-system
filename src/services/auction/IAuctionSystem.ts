import { IAuction, Bid, BiddingState } from "./AuctionTypes";

export interface IAuctionSystem {
  CreateAuction(auction: IAuction): Promise<IAuction | null>;
  IncomingBid(bid: Bid): Promise<Bid | null | BiddingState>;
  HighestBid(productName: string): unknown;
}
