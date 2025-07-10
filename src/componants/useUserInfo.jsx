import { useQuery } from '@tanstack/react-query';
import AxiosAuth from '../api/AxiosAuth';

const fetchUserInfo = async () => {
  const { data } = await AxiosAuth.get('/Account/userinfo');
  return data;
};

export default function useUserInfo() {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: fetchUserInfo,
    staleTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!localStorage.getItem('token'),
  });
}
