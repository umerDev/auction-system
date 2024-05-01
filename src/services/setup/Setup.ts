import * as fs from "fs";

import { AuctionSystem } from "../auction/AuctionSystem";
import { Auctions } from "../auction/AuctionTypes";
import { Database } from "../db/Database";
import { ClassTimer } from "../timer/Timer";

let auctionSystem: AuctionSystem;

// connect to db
export const SetupDatabase = async () => {
  const database = new Database();
  await database.Connect();
  return database;
};

// load all auctions
export const SetupAuctions = async (database: Database) => {
  const loadAuctions: Auctions = JSON.parse(
    fs.readFileSync("data/Auctions.json", "utf-8")
  );

  for (let i = 0; i < loadAuctions.auctions.length; i++) {
    const currentAuction = loadAuctions.auctions[i];
    auctionSystem = new AuctionSystem(
      database,
      new ClassTimer(currentAuction.timeLimit)
    );

    await auctionSystem.CreateAuction(currentAuction);
  }
  return auctionSystem;
};
