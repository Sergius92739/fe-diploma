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

export interface ICitiesState {
  fromCity: TCityObj | null;
  toCity: TCityObj | null;
}
