import { Auction, Bid } from "./AuctionTypes";

export interface IAuctionSystem {
  CreateAuction(auction: Auction): Auction | null;
  IncomingBid(bid: Bid): Promise<Bid | null>;
  HighestBid(): string;
}
