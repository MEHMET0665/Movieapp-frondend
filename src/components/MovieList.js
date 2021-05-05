import React from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";
import { Grid } from 'semantic-ui-react';

function MovieList({ movies,deleteMovie }) {
  console.log("MovieList:",movies)
  const movieList = (
    <Grid>
      <Grid.Row columns={3}>
        {movies.map((movie) => (
          <Grid.Column key={movie.id}>
            <MovieCard movie={movie} deleteMovie={deleteMovie} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );


  const emptyMessage = <div>There are no movies yet...</div>;
  return <div>
           
      {movies.length === 0 ? emptyMessage : movieList}</div>;
}

MovieList.propTypes = { movies: PropTypes.array.isRequired };

export default MovieList;
