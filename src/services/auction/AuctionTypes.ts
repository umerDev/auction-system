export type Bid = {
  bidId: string;
  productId: string;
  price?: number;
};

export interface IAuction {
  productName: string;
  productId: string;
  startingPrice: number;
  acceptedPrice?: number;
  timeLimit: number;
  bidAccepted: boolean;
  bids: Bid[];
}

export type Auctions = {
  auctions: IAuction[];
};

export enum BiddingState {
  SUBMITTED = "BID SUBMITTED",
  TO_LOW = "BID TO LOW",
  FINISHED = "BIDDING HAS FINISHED",
}

export enum AuctionState {
  CREATED = "AUCTION CREATED",
  FAILED = "FAILED TO CREATE AUCTION",
}
