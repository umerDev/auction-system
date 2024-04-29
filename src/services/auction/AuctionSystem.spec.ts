import { anyString, DeepMockProxy, mockDeep } from "jest-mock-extended";
import { AuctionSystem } from "./AuctionSystem";
import { IAuction, Bid, BiddingState, AuctionState } from "./AuctionTypes";
import { Database } from "../db/Database";
import { ClassTimer } from "../timer/Timer";

let database: DeepMockProxy<Database>;
let timer: ClassTimer;
let duration = 30;

afterEach(() => {
  jest.clearAllMocks();
});

beforeEach(() => {
  database = mockDeep<Database>();
  timer = new ClassTimer(duration);
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

  it("should return Bid to low if incoming bid is less than starting price", async () => {
    //arrange
    const auctionBid: Bid = {
      bidId: "PS5",
      productId: "ps5",
      price: 232,
    };

    const auction: IAuction = {
      productName: "Playstation 5",
      productId: "ps5",
      startingPrice: 400,
      acceptedPrice: 0,
      timeLimit: 30000,
      bidAccepted: false,
      bids: [],
    };

    database.GetStartingPrice.mockReturnValue(
      Promise.resolve(auction.startingPrice)
    );

    //act
    const bid = await new AuctionSystem(database, timer).IncomingBid(
      auctionBid
    );

    //assert
    expect(bid).toEqual(BiddingState.BID_TO_LOW);
  });
});

describe("AuctionSystem().CreateAuction", () => {
  it("should create a new Auction based of params", async () => {
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

    database.CreateAuction.mockReturnValue(
      Promise.resolve(AuctionState.CREATED)
    );

    //act
    const createAuction = await new AuctionSystem(
      database,
      timer
    ).CreateAuction(newAuction);

    //assert

    expect(createAuction).toEqual("CREATED");
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

describe("AuctionSystem().GetStartingPrice", () => {
  it("should get the starting price for an item", async () => {
    //arrange
    const auction: IAuction = {
      productName: "Playstation 5",
      productId: "ps5",
      startingPrice: 400,
      acceptedPrice: 0,
      timeLimit: 30000,
      bidAccepted: false,
      bids: [],
    };

    database.GetStartingPrice.mockReturnValue(
      Promise.resolve(auction.startingPrice)
    );

    //act
    const getStartingPrice = await new AuctionSystem(
      database,
      timer
    ).GetStartingPrice(auction.productId);

    //assert
    expect(getStartingPrice).toEqual(400);
  });
});
