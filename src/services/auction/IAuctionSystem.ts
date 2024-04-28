import { IAuction, Bid } from "./AuctionTypes";

export interface IAuctionSystem {
  CreateAuction(auction: IAuction): IAuction | null;
  IncomingBid(bid: Bid): Promise<Bid | null>;
  HighestBid(productName: string): unknown;
}
