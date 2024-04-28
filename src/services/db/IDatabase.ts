import { Bid } from "../auction/AuctionTypes";

export interface IDatabase {
  SaveBid(bid: Bid);
  GetHighestBid(productName: string);
  Connect(): Promise<void | Error>;
}
