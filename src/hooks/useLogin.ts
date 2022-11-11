import { useEffect, useState } from 'react';
import cookies from 'js-cookie';

const useLogin = () => {
  const [token, setToken] = useState<string | null | undefined>(null);

  useEffect(() => {
    (() => {
      const token = cookies.get('accessToken');
      setToken(token);
    })();
  }, []);

  return { token };
};

export default useLogin;
