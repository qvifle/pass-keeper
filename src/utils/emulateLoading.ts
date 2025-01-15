import getRandomNumber from "./getRandomNumber";

const emulateLoading = ({
  delayAverage,
  onSucces,
  onError,
  onEnd,
}: {
  delayAverage: { from: number; to: number };
  onSucces: () => void;
  onError: () => void;
  onEnd?: () => void;
}) => {
  const delay = getRandomNumber(delayAverage.from, delayAverage.to);
  const isSucces = !!getRandomNumber(0, 1);

  const timer = setTimeout(() => {
    if (isSucces) {
      onSucces();
    } else {
      onError();
    }

    if (onEnd) {
      onEnd();
    }
  }, delay);

  return timer;
};

export default emulateLoading;
