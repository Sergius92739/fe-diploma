export const isValidDate = (y: number, m: number, d: number) => {
  const date = new Date(y, --m, d);
  return (
    y === date.getFullYear() && m === date.getMonth() && d === date.getDate()
  );
};
