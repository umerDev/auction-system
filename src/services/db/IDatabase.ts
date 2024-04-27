import mongoose from "mongoose";
import { Bid } from "../auction/AuctionTypes";

export interface IDatabase {
  SaveBid(bid: Bid): Promise<mongoose.Document<unknown>>;
  GetHighestBid(): Bid;
  Connect(): Promise<void | Error>;
}
