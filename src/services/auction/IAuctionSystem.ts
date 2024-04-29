import { IAuction, Bid, BiddingState, AuctionState } from "./AuctionTypes";

export interface IAuctionSystem {
  CreateAuction(auction: IAuction): Promise<AuctionState>;
  IncomingBid(bid: Bid): Promise<null | BiddingState>;
  HighestBid(productName: string): unknown;
  SetAcceptedPrice(productId: string, acceptedPrice: number): Promise<number>;
  GetStartingPrice: (productId: string) => Promise<number>;
}
