// load auctions from json ?
// accept bids from message bus
// return highest bids for each auction
import * as dotenv from "dotenv";
import * as fs from "fs";

import { AuctionSystem } from "./src/services/auction/AuctionSystem";
import { Database } from "./src/services/db/Database";
import { Auctions } from "./src/services/auction/AuctionTypes";
import { AuctionRoutes } from "./src/services/api/server";
dotenv.config();

// connect to db
const setupDatabase = async () => {
  const database = new Database();
  await database.Connect();
  return database;
};

// load all auctions
const setupAuctions = (auctionSystem: AuctionSystem) => {
  const loadAuctions: Auctions = JSON.parse(
    fs.readFileSync("Auctions.json", "utf-8")
  );
  for (let i = 0; i < loadAuctions.auctions.length; i++) {
    const currentAuction = loadAuctions.auctions[i];
    auctionSystem.CreateAuction(currentAuction);
    console.log(currentAuction);
  }
};

(async () => {
  const database = await setupDatabase();
  const auctionSystem = new AuctionSystem(database);

  setupAuctions(auctionSystem);
  AuctionRoutes(auctionSystem);
})().catch((e) => {
  console.error(`error occured: ${e}`);
});

// todo
// test mongo db connection - done
// create api routes
// save to bid to db
// get bid
// fix tests
