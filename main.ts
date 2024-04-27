// load auctions from json ?
// accept bids from message bus
// return highest bids for each auction

import fs from "fs";
import { AuctionSystem } from "./src/services/auction/AuctionSystem";
import { Database } from "./src/services/db/Database";
import { Auctions } from "./src/services/auction/AuctionTypes";

let database: Database;

// connect to db
const setupDatabase = async () => {
  database = new Database();
  await database.Connect();
};

// load all auctions
const setupAuctions = () => {
  const loadAuctions: Auctions = JSON.parse(
    fs.readFileSync("Auctions.json", "utf-8")
  );

  const auctionSystem = new AuctionSystem(database);

  for (let i = 0; i < loadAuctions.auctions.length; i++) {
    const currentAuction = loadAuctions.auctions[i];
    auctionSystem.CreateAuction(currentAuction);
  }
};

// todo
// test mongo db connection
// save to bid to db
// get bid
