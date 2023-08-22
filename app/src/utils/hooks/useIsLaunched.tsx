import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useIsLaunched = () => {
  const [isLaunched, setIsLaunched] = useState<boolean>(false);

  useEffect(() => {
    AsyncStorage.getItem('isLaunched').then((value: string | null) => {
      if (value === null || value !== 'true') {
        AsyncStorage.setItem('isLaunched', 'true').then(() =>
          console.log('first launched set'),
        );
      } else {
        setIsLaunched(true);
      }
    });
  }, [setIsLaunched]);

  return {isLaunched};
};

export default useIsLaunched;
