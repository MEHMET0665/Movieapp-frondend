//rcredux
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MovieList from "../MovieList";
import { fetchMovies,onDeleteMovieSubmit } from "../../actions/movieActions";
import {ScaleLoader} from "react-spinners";

export class MoviesPage extends Component {
  //static propTypes = {moviesReducer:PropTypes.object.isRequired}

  static propTypes = {
    moviesReducer: PropTypes.shape({ movies: PropTypes.array.isRequired })
      .isRequired,
  };
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    //console.log(this.props);
    const errMessage = this.props.moviesReducer.error.message;
    return (
      <div>
        <h2>Movies List</h2>
        <ScaleLoader width={6} color={'#36D7B7'} loading={this.props.moviesReducer.fetching}/>
        {errMessage ? (
          <h3>Error data! ({errMessage})</h3>
        ) : (
          <MovieList movies={this.props.moviesReducer.movies} deleteMovie={this.props.onDeleteMovieSubmit} />
        )}
      </div>
    );
  }
}

//const mapStateToProps = (state) => ({movies:state.moviesReducer})
const mapStateToProps = ({ moviesReducer }) => ({ moviesReducer });

const mapDispatchToProps = { fetchMovies,onDeleteMovieSubmit };

export default connect(mapStateToProps, mapDispatchToProps)(MoviesPage);
