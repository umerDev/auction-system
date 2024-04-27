import { Bid } from "../auction/AuctionTypes";

export interface IDatabase {
  SaveBid(): boolean;
  GetHighestBid(): Bid;
}
