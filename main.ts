import * as dotenv from "dotenv";
import * as fs from "fs";

import { AuctionSystem } from "./src/services/auction/AuctionSystem";
import { Database } from "./src/services/db/Database";
import { Auctions } from "./src/services/auction/AuctionTypes";
import { AuctionRoutes } from "./src/services/api/server";
import { ClassTimer } from "./src/services/timer/Timer";

dotenv.config();

let auctionSystem: AuctionSystem;

// connect to db
const setupDatabase = async () => {
  const database = new Database();
  await database.Connect();
  return database;
};

// load all auctions
const setupAuctions = async (database: Database) => {
  const loadAuctions: Auctions = JSON.parse(
    fs.readFileSync("Auctions.json", "utf-8")
  );

  for (let i = 0; i < loadAuctions.auctions.length; i++) {
    const currentAuction = loadAuctions.auctions[i];
    auctionSystem = new AuctionSystem(
      database,
      new ClassTimer(loadAuctions.auctions[i].timeLimit)
    );

    await auctionSystem.CreateAuction(currentAuction);
  }
};

(async () => {
  const database = await setupDatabase();

  await setupAuctions(database);

  AuctionRoutes(auctionSystem);
})().catch((e: unknown) => {
  const error = e as Error;
  console.error(`error occured: ${error.message}`);
});

// todo
// test mongo db connection - done
// create api routes - done
//  - save bid - done
//  - get bid - done
// Create time mechanism - done
// fix tests

// persist auctions - done
// start timer - done
