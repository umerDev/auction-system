import * as fs from "fs";

import { AuctionSystem } from "../auction/AuctionSystem";
import { Auctions } from "../auction/AuctionTypes";
import { Database } from "../db/Database";
import { ClassTimer } from "../timer/Timer";
import { MongoConfig } from "../config/Config";

export class Setup {
  private database: Database;
  private mongoConfig: MongoConfig;

  constructor(database: Database, mongoSetup: MongoConfig) {
    this.database = database;
    this.mongoConfig = mongoSetup;
  }

  Database = async () => {
    return await this.database.Connect(this.mongoConfig);
  };

  LoadAuctions = (auctionFile: fs.PathOrFileDescriptor): Auctions =>
    JSON.parse(fs.readFileSync(auctionFile, "utf-8"));

  Auctions = async (auctionFile: fs.PathOrFileDescriptor) => {
    let auctionSystem: AuctionSystem;

    const loadAuctions = this.LoadAuctions(auctionFile);

    for (let i = 0; i < loadAuctions.auctions.length; i++) {
      const currentAuction = loadAuctions.auctions[i];
      auctionSystem = new AuctionSystem(
        this.database,
        new ClassTimer(currentAuction.timeLimit)
      );

      await auctionSystem.CreateAuction(currentAuction);
    }
    return auctionSystem;
  };
}
