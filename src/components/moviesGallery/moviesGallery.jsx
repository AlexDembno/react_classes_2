function MoviesGallery({ movies, showModal }) {
  const element = movies.map(
    ({ id, title, vote_count: vote, backdrop_path: image }) => (
      <li key={id}>
        <p>{title}</p>
        <p>votes: {vote}</p>
        <button onClick={() => showModal({ src: image, alt: title })}>
          Show poster
        </button>
      </li>
    )
  );
  return <ul>{element}</ul>;
}
export default MoviesGallery;
