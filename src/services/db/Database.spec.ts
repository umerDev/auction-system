import { Bid, IAuction } from "../auction/AuctionTypes";
import { Database } from "./Database";

describe.skip("Database().SaveBid", () => {
  it("should save a bid", () => {
    //arrange
    const bid: Bid = { bidId: "PS5", productId: "ps5", price: 434.0 };

    //act
    const saveBid = new Database().SaveBid(bid);

    //assert
    expect(saveBid).toEqual(true);
  });

  it("should get the highest bid", () => {
    //arrange
    const highestBid: IAuction = {
      productName: "PS5 Headset",
      productId: "headset",
      startingPrice: 40,
      acceptedPrice: null,
      timeLimit: new Date("2024-04-27T07:54:52.284Z"),
      bidAccepted: false,
      bids: [
        { bidId: "PS5", productId: "ps5", price: 434.0 },
        { bidId: "PS5", productId: "ps5", price: 435.0 },
      ],
    };

    //act
    const saveBid = new Database().GetHighestBid("");

    //assert
    expect(saveBid).toEqual(highestBid);
  });
});
