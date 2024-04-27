import { Bid } from "../auction/AuctionTypes";
import { Database } from "./Database";

describe("Database().SaveBid", () => {
  it("should save a bid", () => {
    //arrange
    const bid: Bid = {
      price: 1,
      bidId: "test",
    };

    //act
    const saveBid = new Database().SaveBid(bid);

    //assert
    expect(saveBid).toEqual(true);
  });

  it("should get the highest bid", () => {
    //arrange
    const highestBid = {
      bidId: "umer",
      price: 200,
    };

    //act
    const saveBid = new Database().GetHighestBid();

    //assert
    expect(saveBid).toEqual(highestBid);
  });
});
