import mongoose from "mongoose";
import { IAuction } from "../auction/AuctionTypes";

export interface IDatabase {
  SaveBid(auction: IAuction): Promise<mongoose.Document<unknown>>;
  GetHighestBid(
    productName: string
  ): Promise<mongoose.Document<unknown> | null>;
  Connect(): Promise<void | Error>;
}
