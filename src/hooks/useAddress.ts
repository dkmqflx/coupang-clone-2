import { useEffect, useRef, useState } from 'react';
import { addressType } from '../types/order';

const ADDRESS = 'address';

const useAddress = () => {
  const channel = useRef<BroadcastChannel>();
  const [address, setAddress] = useState<addressType>();

  const postMessage = (message: any) => {
    channel.current?.postMessage(message);
  };

  const onPopUpAddress = (id: number) => {
    window.open(`address?id=${id}`);
  };

  useEffect(() => {
    channel.current = new BroadcastChannel(ADDRESS);

    if (channel.current) {
      channel.current.addEventListener('message', (event) => {
        setAddress(event.data);
      });
    }

    return () => {
      channel.current?.removeEventListener('message', (event) => {
        setAddress(event.data);
      });
    };
  }, []);

  return { postMessage, address, onPopUpAddress };
};

export default useAddress;
