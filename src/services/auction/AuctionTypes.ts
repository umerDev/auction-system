export type Bid = {
  bidId: string;
  price?: number;
};

export interface IAuction {
  productName: string;
  productId: string;
  startingPrice: number;
  acceptedPrice?: number;
  timeLimit: Date;
  bidAccepted: boolean;
  bids: Bid[];
}

export type Auctions = {
  auctions: IAuction[];
};
