export type TCityObj = {
  _id: number;
  name: string;
};

export type TSearchResult = {
  searchResults: TCityObj[];
  loading: boolean;
  setSearchResults: React.Dispatch<React.SetStateAction<TCityObj[]>>;
  error: string;
};
