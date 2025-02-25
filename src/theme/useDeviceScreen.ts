import { useMediaQuery } from './useMediaQuery';

export const IPAD_V_WIDTH = 820;
export const IPAD_H_WIDTH = 1180;
export const MAC_WIDTH = 1280;

export const useDeviceScreen = () => {
  const isIphone = useMediaQuery(`(max-width: ${IPAD_V_WIDTH - 1}px)`);
  const isIpadv = useMediaQuery(
    `(min-width: ${IPAD_V_WIDTH}px) and (max-width: ${IPAD_H_WIDTH - 1}px)`
  );
  const isIpadh = useMediaQuery(
    `(min-width: ${IPAD_H_WIDTH}px) and (max-width: ${MAC_WIDTH - 1}px)`
  );

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

export const MEDIA = {
  iphone: `(max-width: ${IPAD_V_WIDTH - 1}px)`,
  ipadv: `(min-width: ${IPAD_V_WIDTH}px)`,
  ipadh: `(min-width: ${IPAD_H_WIDTH}px)`,
  mac: `(min-width: ${MAC_WIDTH}px)`,
};
