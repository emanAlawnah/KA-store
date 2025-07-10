import { useQuery } from '@tanstack/react-query';
import AxiosAuth from '../api/AxiosAuth';

export default function PreFetchData() {
  const fetchOrderWithDetails = async () => {
    const { data: orders } = await AxiosAuth.get('/Orders');
    const approved = orders.filter(order => order.orderStatus === 'Approved');
    const orderWithDetails = await Promise.all(
      approved.map(async (order) => {
        const { data } = await AxiosAuth.get(`/Orders/${order.id}`);
        return data;
      })
    );
    return orderWithDetails;
  };

  useQuery({
    queryKey: ['userOrdersWithDetails'],
    queryFn: fetchOrderWithDetails,
    staleTime: 1000 * 60 * 15,
    enabled: !!localStorage.getItem('token'),
  });

  return null;
}