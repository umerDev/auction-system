import { IAuctionSystem } from "../auction/IAuctionSystem";
import { Bid, IAuction } from "../auction/AuctionTypes";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const AuctionRoutes = (AuctionSystem: IAuctionSystem) => {
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Express & TypeScript Server");
  });

  app.get("/api/highest-bid", async (req, res) => {
    console.log(req.query.productId);
    const highest = await AuctionSystem.HighestBid(
      req.query.productId as unknown as string
    );
    console.log(highest);
    res.sendStatus(204);
  });

  app.post("/api/bid", async (req: Request, res: Response) => {
    console.log(req.body);
    const body = req.body as unknown as Bid;
    console.log(body);
    if (!body) return res.status;
    await AuctionSystem.IncomingBid(body);
    res.sendStatus(201);
  });

  app.listen(port, () => {
    console.log(`Server is Live at http://localhost:${port}`);
  });
};
