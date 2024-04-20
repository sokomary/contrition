import { useMediaQuery } from './useMediaQuery';

const IPAD_V_WIDTH = 820;
const IPAD_H_WIDTH = 1180;
const MAC_WIDTH = 1720;

export const useDeviceScreen = () => {
  const isIphone = useMediaQuery(`(max-width: ${IPAD_V_WIDTH - 1}px)`);
  const isIpadv = useMediaQuery(`(min-width: ${IPAD_V_WIDTH}px) and (max-width: ${IPAD_H_WIDTH - 1}px)`);
  const isIpadh = useMediaQuery(`(min-width: ${IPAD_H_WIDTH}px) and (max-width: ${MAC_WIDTH - 250}px)`);

  if (isIphone) {
    return 'iphone';
  }
  if (isIpadv) {
    return 'ipadv';
  }
  if (isIpadh) {
    return 'ipadh';
  }
  return 'mac';
};
