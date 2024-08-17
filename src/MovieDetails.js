import { useState, useEffect } from "react";
import Loader from "./Loader";
const key = "da58e41a";
export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Math.floor(Number(imdbRating)),
      runtime: Math.floor(Number(runtime.split(" ").at(0))),
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);
        console.log(selectedId);
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`
          );
          if (!res.ok) throw new Error("Error while fetching movie details");
          const data = await res.json();
          //console.log(data);
          setMovie(data);
          console.log(movie);
          setIsLoading(false);

          if (data.Response === "False")
            throw new Error("Movie details not found");
        } catch (err) {
          console.log(err.message);
        }
      }
      fetchMovieDetails();
    },
    [selectedId]
  );
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              ) : (
                <p>You have already added this movie</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
