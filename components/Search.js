import { useState } from 'react';

function Search({ searchQuery }) {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        value={query}
        placeholder="Search..."
        onChange={() => {
          setQuery(e.target.value);
          searchQuery = query;
        }}
      />
    </div>
  );
}

export default Search;
