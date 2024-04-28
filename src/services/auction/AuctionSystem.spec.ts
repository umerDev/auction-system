import { mockDeep } from "jest-mock-extended";
import { IDatabase } from "../db/IDatabase";
import { AuctionSystem } from "./AuctionSystem";
import { IAuction, Bid } from "./AuctionTypes";
import { Database } from "../db/Database";

export const testDate = "2024-04-27T07:54:52.284Z";

let database = mockDeep<Database>();

describe.skip("AuctionSystem().IncomingBid", () => {
  it("should verify incoming bid", async () => {
    //arrange
    const auctionBid: Bid = { bidId: "PS5", productId: "ps5", price: 434.0 };

    //act
    const acceptBid = await new AuctionSystem(database).IncomingBid(auctionBid);

    //assert
    expect(acceptBid).toEqual(auctionBid);
  });

  it("should return null if no price", () => {
    //arrange
    const auctionBid: Bid = { bidId: "PS5", productId: "ps5", price: 434.0 };

    //act
    const acceptBid = new AuctionSystem(database).IncomingBid(auctionBid);

    //assert
    expect(acceptBid).toEqual(null);
  });
});

describe.skip("AuctionSystem().CreateAuction", () => {
  it("should create a new Auction based of params", () => {
    //arrange
    const newAuction: IAuction = {
      productName: "PS5 Headset",
      productId: "headset",
      startingPrice: 40,
      acceptedPrice: 0,
      timeLimit: new Date("2024-04-27T07:54:52.284Z"),
      bidAccepted: false,
      bids: [{ bidId: "PS5", productId: "ps5", price: 434.0 }],
    };

    //act
    const createAuction = new AuctionSystem(database).CreateAuction(newAuction);

    //assert
    expect(createAuction).toEqual(newAuction);
  });

  it("should return null if no product name", () => {
    //arrange
    const newAuction: IAuction = {
      productName: "",
      productId: "",
      startingPrice: 40,
      acceptedPrice: 0,
      timeLimit: new Date("2024-04-27T07:54:52.284Z"),
      bidAccepted: false,
      bids: [{ bidId: "PS5", productId: "ps5", price: 434.0 }],
    };

    //act
    const createAuction = new AuctionSystem(database).CreateAuction(newAuction);

    //assert
    expect(createAuction).toEqual(null);
  });
});

describe.skip("AuctionSystem().HighestBid", () => {
  it("should return the highest bid", () => {
    //arrange
    const highestBid = "HighestBid";

    //act
    const getHighestBid = new AuctionSystem(database).HighestBid("ps5");

    //assert
    expect(getHighestBid).toEqual(highestBid);
  });
});
