import request from "supertest";

import { AuctionRoutes } from "./server";
import { mockDeep } from "jest-mock-extended";
import { AuctionSystem } from "../auction/AuctionSystem";
import {
  AuctionState,
  Bid,
  BiddingState,
  IAuction,
} from "../auction/AuctionTypes";
import { IAuctionSystem } from "../auction/IAuctionSystem";
import { Application } from "express";

let mockAuctionSystem: IAuctionSystem;
let auctionRoutes: Application;

beforeAll(() => {
  mockAuctionSystem = mockDeep<AuctionSystem>();
  auctionRoutes = AuctionRoutes(mockAuctionSystem);
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("POST /api/bid/", () => {
  it("should create a bid", (done) => {
    const bid: Bid = {
      bidId: "ps5",
      productId: "Playstation 5",
      price: 222,
    };

    request(auctionRoutes)
      .post("/api/bid")
      .expect("Content-Type", /json/)
      .send(bid)
      .expect((res: Response) => {
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
          message: "created bid for item",
        });
      })
      .end((err: unknown, _res: Response) => {
        if (err) return done(err);
        return done();
      });
  });

  it("should return bidding has finished", (done) => {
    const bid: Bid = {
      bidId: "ps5",
      productId: "Playstation 5",
      price: 222,
    };

    mockAuctionSystem.IncomingBid = jest
      .fn()
      .mockReturnValue(BiddingState.FINISHED);

    request(auctionRoutes)
      .post("/api/bid")
      .expect("Content-Type", /json/)
      .send(bid)
      .expect((res: Response) => {
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
          message: "bidding has finished for this item",
        });
      })
      .end((err: unknown, _res: Response) => {
        if (err) return done(err);
        return done();
      });
  });

  it("should return bid to low", (done) => {
    const bid: Bid = {
      bidId: "ps5",
      productId: "Playstation 5",
      price: 222,
    };

    mockAuctionSystem.IncomingBid = jest
      .fn()
      .mockReturnValue(BiddingState.TO_LOW);

    request(auctionRoutes)
      .post("/api/bid")
      .expect("Content-Type", /json/)
      .send(bid)
      .expect((res: Response) => {
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
          message: "bid to low",
        });
      })
      .end((err: unknown, _res: Response) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe("GET /api/highest-bid/", () => {
  it("should get the highest bid", (done) => {
    const bid: Bid = {
      bidId: "ps5",
      productId: "Playstation 5",
      price: 222,
    };

    mockAuctionSystem.HighestBid = jest.fn().mockReturnValue(bid);

    request(auctionRoutes)
      .get("/api/highest-bid/")
      .send(bid)
      .expect((res: Response) => {
        expect(res.status).toEqual(200);
        expect(res.body).toMatchObject({
          highest: {
            bidId: "ps5",
            price: 222,
            productId: "Playstation 5",
          },
        });
      })
      .end((err: unknown, _res: Response) => {
        if (err) return done(err);
        return done();
      });
  });
});
