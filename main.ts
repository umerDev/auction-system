// load auctions from json ?
// accept bids from message bus
// return highest bids for each auction
import fs from "fs";
import { AuctionSystem } from "./src/services/auction/AuctionSystem";
import { Database } from "./src/services/db/Database";
import { Auctions } from "./src/services/auction/AuctionTypes";

const loadAuctions: Auctions = JSON.parse(
  fs.readFileSync("Auctions.json", "utf-8")
);

const database = new Database();
const auctionSystem = new AuctionSystem(database);

// load all auctions
const setupAuctions = () => {
  for (let i = 0; i < loadAuctions.auctions.length; i++) {
    const currentAuction = loadAuctions.auctions[i];
    auctionSystem.CreateAuction(currentAuction);
  }
};
