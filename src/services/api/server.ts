import { IAuctionSystem } from "../auction/IAuctionSystem";
import { IAuction } from "../auction/AuctionTypes";
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

  app.post("/clicked", (req, res) => {
    console.log(req);
    console.log(req.body);
    res.sendStatus(201);
  });

  app.post("/api/bid", async (req: Request, res: Response) => {
    console.log(req.body);
    const body = req.body as unknown as IAuction;
    if (!body) return res.status;
    await AuctionSystem.IncomingBid(body);
    res.sendStatus(201);
  });

  app.listen(port, () => {
    console.log(`Server is Live at http://localhost:${port}`);
  });
};
