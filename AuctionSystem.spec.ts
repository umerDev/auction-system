import { AuctionSystem } from "./AuctionSystem";
import { Auction, Bid } from "./AuctionTypes";

export const testDate = "2024-04-27T07:54:52.284Z";

describe("AuctionSystem().IncomingBid", () => {
  it("should verify incoming bid", () => {
    //arrange
    const bid: Bid = {
      bidId: "PS5",
      price: 434.0,
    };

    //act
    const acceptBid = new AuctionSystem().IncomingBid(bid);

    //assert
    expect(acceptBid).toEqual(bid);
  });

  it("should return null if no price", () => {
    //arrange
    const bid: Bid = {
      bidId: "PS5",
      price: null,
    };

    //act
    const acceptBid = new AuctionSystem().IncomingBid(bid);

    //assert
    expect(acceptBid).toEqual(null);
  });
});

describe("AuctionSystem().CreateAuction", () => {
  it("should create a new Auction based of params", () => {
    //arrange
    const newAuction: Auction = {
      productName: "PS5",
      startingPrice: 434.0,
      acceptedPrice: null,
      timeLimit: new Date(testDate),
      bidAccepted: false,
    };

    //act
    const createAuction = new AuctionSystem().CreateAuction(newAuction);

    //assert
    expect(createAuction).toEqual(newAuction);
  });

  it("should return null if no product name", () => {
    //arrange
    const newAuction: Auction = {
      bidAccepted: true,
      productName: "",
      startingPrice: 434.0,
      acceptedPrice: 434.0,
      timeLimit: new Date(testDate),
    };

    //act
    const createAuction = new AuctionSystem().CreateAuction(newAuction);

    //assert
    expect(createAuction).toEqual(null);
  });
});
