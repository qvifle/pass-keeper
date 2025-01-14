const preventLimitValue = (
  maxValue: number,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const value = parseInt(e.target.value);
  if (value > maxValue) {
    e.target.value = maxValue.toString();
  }
};

export default preventLimitValue;
