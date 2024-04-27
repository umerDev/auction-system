import { Bid } from "../auction/AuctionTypes";
import { IDatabase } from "./IDatabase";

export class Database implements IDatabase {
  SaveBid(): boolean {
    throw new Error("Method not implemented.");
  }
  GetHighestBid(): Bid {
    throw new Error("Method not implemented.");
  }
}
