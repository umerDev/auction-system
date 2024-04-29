import { IAuctionSystem } from "../auction/IAuctionSystem";
import { Bid, BiddingState, IAuction } from "../auction/AuctionTypes";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";

const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export const AuctionRoutes = (AuctionSystem: IAuctionSystem) => {
  app.get("/api/highest-bid", async (req, res) => {
    const highest = await AuctionSystem.HighestBid(
      req.query.productId as unknown as string
    );
    return res.send({ highest });
  });

  app.post("/api/bid", async (req: Request, res: Response) => {
    const body = req.body as unknown as Bid;

    if (!body) return res.status;

    const bid = await AuctionSystem.IncomingBid(body);

    if (bid === BiddingState.FINISHED) {
      return res.send({ message: "bidding has finished for this item" });
    }

    if (bid === BiddingState.TO_LOW) {
      return res.send({ message: "bid to low" });
    }

    return res.send({
      message: `created bid for item`,
    });
  });

  app.post("/api/create-auction", async (req: Request, res: Response) => {
    const body = req.body as unknown as IAuction;

    if (!body) return res.status;

    const createAuction = await AuctionSystem.CreateAuction(body);

    if (createAuction) {
      return res.sendStatus(201);
    }
    return res.sendStatus(400);
  });

  return app;
};
