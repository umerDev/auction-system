import * as dotenv from "dotenv";

import { AuctionRoutes } from "./src/services/api/server";
import { PORT } from "./src/services/config/Config";
import { SetupDatabase, SetupAuctions } from "./src/services/setup/Setup";

dotenv.config();

(async () => {
  const database = await SetupDatabase();

  const auctionSystem = await SetupAuctions(database);

  const app = AuctionRoutes(auctionSystem);

  app.listen(PORT, () => {
    console.log(`Server is Live at http://localhost:${PORT}`);
  });
})().catch((e: unknown) => {
  const error = e as Error;
  console.error(`error occured: ${error.message}`);
});
