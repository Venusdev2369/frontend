export type CryptoOrderStatus = 'completed' | 'pending' | 'failed';

export interface CryptoOrder {
  BetID: string;
  Player: string;
  Time: string;
  Payout: number;
  Profit: string;
}
