import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentOrders() {
  const cryptoOrders: CryptoOrder[] = [
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    },
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    },
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    },
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    },
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    },
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    },
    {
      BetID: '23424123123b546',
      Player: 'Anos',
      Time: new Date().getTime().toString(),
      Payout: 0.01,
      Profit: "+0.000002"
    }
  ];

  return (
    <Card>
      <RecentOrdersTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default RecentOrders;
