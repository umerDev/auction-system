import { IAuction, Bid } from "./AuctionTypes";

export interface IAuctionSystem {
  CreateAuction(auction: IAuction): IAuction | null;
  IncomingBid(auction: IAuction): Promise<IAuction | null>;
  HighestBid(productName: string): unknown;
}
