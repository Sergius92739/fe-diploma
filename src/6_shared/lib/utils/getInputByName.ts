export const getInputByName = (name: string) => {
  return document.querySelector(`input[name="${name}"][type="text"]`);
};
