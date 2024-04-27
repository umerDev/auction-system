import { testDate } from "./AuctionSystem.spec";
import { Auction, Bid } from "./AuctionTypes";
//
// Create Auction with time limit and starting price
// Incoming bids
// Persist bid to db
// Once time limit expire select highest bid

export class AuctionSystem {
  CreateAuction = (auction: Auction) => {
    if (!auction.productName) return null;

    return auction;
  };

  IncomingBid = (bid: Bid) => {
    if (!bid.price) return null;

    const acceptedBid: Auction = {
      bidAccepted: true,
      productName: "PS5",
      startingPrice: 434.0,
      acceptedPrice: 434.0,
      timeLimit: new Date(testDate),
    };
    return acceptedBid;
  };
}
