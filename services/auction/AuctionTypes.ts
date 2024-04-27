export type Auction = {
  productName: string;
  startingPrice: number;
  acceptedPrice: number | null;
  timeLimit: Date;
  bidAccepted: boolean;
};

export type Bid = {
  bidId: string;
  price: number | null;
};
