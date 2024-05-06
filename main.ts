import * as dotenv from "dotenv";

import { AuctionRoutes } from "./src/services/api/server";
import { mongoConfig, PORT } from "./src/services/config/Config";
import { Setup } from "./src/services/setup/Setup";
import { Database } from "./src/services/db/Database";

dotenv.config();
const auctionFilePath = "data/Auctions.json";

(async () => {
  const database = new Database();

  const setup = new Setup(database, mongoConfig);
  await setup.Database();
  const auctionSystem = await setup.Auctions(auctionFilePath);

  const app = AuctionRoutes(auctionSystem);

  app.listen(PORT, () => {
    console.log(`Server is Live at http://localhost:${PORT}`);
  });
})().catch((e: unknown) => {
  const error = e as Error;
  console.error(`error occured: ${error.message}`);
});
