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
  FINISHED = "FINISHED",
}
