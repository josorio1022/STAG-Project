
interface SearchInputProps {
  search: string;
  onInputChange: (search: string) => void;
  onSearch: () => void;
}

export default function SearchInput({ search, onInputChange, onSearch }: SearchInputProps) {
	return <div>
		<input type="text" value={search} onChange={e => onInputChange(e.target.value)} style={{
			marginRight: '2px',
		}}/>
		<button type='submit' onClick={onSearch}>Search</button>
	</div>;
}