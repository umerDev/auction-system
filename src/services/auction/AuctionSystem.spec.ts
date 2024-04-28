import { anyString, DeepMockProxy, mockDeep } from "jest-mock-extended";
import { AuctionSystem } from "./AuctionSystem";
import { IAuction, Bid } from "./AuctionTypes";
import { Database } from "../db/Database";
import { ClassTimer } from "../timer/Timer";
import { AuctionModel } from "../db/Models";
import { HydratedDocument } from "mongoose";

export const testDate = "2024-04-27T07:54:52.284Z";

let database: DeepMockProxy<Database>;
let timer: ClassTimer;

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  database = mockDeep<Database>();
  timer = new ClassTimer(30);
});

describe("AuctionSystem().IncomingBid", () => {
  it("should verify incoming bid", async () => {
    //arrange
    const auctionBid: Bid = { bidId: "PS5", productId: "ps5", price: 434.0 };

    //act
    const acceptBid = await new AuctionSystem(database, timer).IncomingBid(
      auctionBid
    );

    //assert
    expect(acceptBid).toEqual(auctionBid);
  });

  it("should return null if no product id", async () => {
    //arrange
    const auctionBid: Bid = {
      bidId: "PS5",
      productId: "",
      price: 232,
    };

    //act
    const acceptBid = await new AuctionSystem(database, timer).IncomingBid(
      auctionBid
    );

    //assert
    expect(acceptBid).toEqual(null);
  });
});

describe("AuctionSystem().CreateAuction", () => {
  it.skip("should create a new Auction based of params", async () => {
    //arrange
    const newAuction: IAuction = {
      productName: "PS5 Headset",
      productId: "headset",
      startingPrice: 40,
      acceptedPrice: 0,
      timeLimit: 1,
      bidAccepted: false,
      bids: [{ bidId: "PS5", productId: "ps5", price: 434.0 }],
    };

    const auctionDocument: HydratedDocument<IAuction> = new AuctionModel({
      productId: newAuction.productId,
      productName: newAuction.productName,
      startingPrice: newAuction.startingPrice,
      acceptedPrice: newAuction.acceptedPrice,
      bidAccepted: newAuction.bidAccepted,
      bids: newAuction.bids,
    });

    database.CreateAuction.mockReturnValue(Promise.resolve(auctionDocument));

    //act
    const createAuction = await new AuctionSystem(
      database,
      timer
    ).CreateAuction(newAuction);

    //assert
    const toMatch = {
      _id: expect.any(String),
      acceptedPrice: 0,
      bidAccepted: false,
      bids: [
        {
          _id: expect.any(String),
          bidId: "PS5",
          price: 434,
        },
      ],
      productId: "headset",
      productName: "PS5 Headset",
      startingPrice: 40,
    };

    expect(createAuction).toMatchObject(toMatch);
  });

  it("should return null if no product name", async () => {
    //arrange
    const newAuction: IAuction = {
      productName: "",
      productId: "",
      startingPrice: 40,
      acceptedPrice: 0,
      timeLimit: 3,
      bidAccepted: false,
      bids: [{ bidId: "PS5", productId: "ps5", price: 434.0 }],
    };

    //act
    const createAuction = await new AuctionSystem(
      database,
      timer
    ).CreateAuction(newAuction);

    //assert
    expect(createAuction).toEqual(null);
  });
});

describe("AuctionSystem().HighestBid", () => {
  it("should return the highest bid", async () => {
    //arrange
    const highestBid: Bid = {
      bidId: "umer",
      price: 343,
      productId: "ps5",
    };

    database.GetHighestBid.mockReturnValue(Promise.resolve(highestBid));

    //act
    const getHighestBid = await new AuctionSystem(database, timer).HighestBid(
      "ps5"
    );

    //assert
    expect(getHighestBid).toEqual(highestBid);
  });
});

describe("AuctionSystem().SetAcceptedPrice", () => {
  it("should update the accepted price for an item", async () => {
    //arrange
    const highestBid: Bid = {
      bidId: "umer",
      price: 3433,
      productId: "ps5",
    };

    database.GetHighestBid.mockReturnValue(Promise.resolve(highestBid));
    database.SetAcceptedPrice.mockResolvedValue(
      Promise.resolve(highestBid.price)
    );

    //act
    const getHighestBid = await new AuctionSystem(
      database,
      timer
    ).SetAcceptedPrice(highestBid.productId, highestBid.price);

    //assert
    expect(getHighestBid).toEqual(3433);
  });
});
