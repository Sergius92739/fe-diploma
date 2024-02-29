export const formatDate = (str: string): string => {
  const arr = str.split('.');
  return `${arr[2]}-${arr[1]}-${arr[0]}}`;
};
