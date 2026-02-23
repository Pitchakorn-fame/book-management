interface ISearchBarProps {
  searchValue: string;
  onChangeFunction: (value: string) => void;
}

const SearchBar = (props: ISearchBarProps) => {
  return (
    <input
      type="text"
      className="h-12 w-full outline-[#BEBEBE] outline-1 focus:outline-[#F28C28] rounded-2xl p-4"
      placeholder="Search book"
      value={props.searchValue}
      onChange={(e) => {
        props.onChangeFunction(e.target.value);
      }}
    />
  );
};

export default SearchBar;
