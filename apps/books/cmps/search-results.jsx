export function SearchResults({ results, onAddBook }) {
  return (
    <ul className="search-list">
      {results.map((result) => (
        <li className="search-item flip-in-hor-bottom" key={result.id}>
          {result.volumeInfo.title}
          <img
            onClick={() => onAddBook(result.volumeInfo)}
            src="../assets/img/plus.png"
            alt=""
          />
        </li>
      ))}
    </ul>
  )
}
