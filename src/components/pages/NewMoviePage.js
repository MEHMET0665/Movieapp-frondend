import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Image,Message } from "semantic-ui-react";
import InlineError from "../InlineError";
import {onNewMovieSubmit,fetchMovie,onUpdateMovieSubmit} 
from '../../actions/newMovieActions'
import { Redirect } from "react-router-dom";

class NewMoviePage extends Component {
  componentDidMount() {
    const {willUpdateMovie,match}=this.props;
    if(!willUpdateMovie && match.params.id)
    {
      this.props.fetchMovie( match.params.id);
      
    }
  }
  componentWillReceiveProps(nextProps) {
    const {newMovieReducer}=nextProps;
    if(newMovieReducer.movies.data){
      this.setState({
        title:newMovieReducer.movies.data.title,
        cover:newMovieReducer.movies.data.cover,
      })
    }
  }
  
  
  
  state = {
    title: this.props.willUpdateMovie ? this.props.willUpdateMovie.title : '' ,
    cover: this.props.willUpdateMovie ? this.props.willUpdateMovie.cover : '' ,
    errors: {},
    redirect:false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log(this.state)
  };

  onSubmit = () => {
    const errors = this.validate();
    this.setState({ errors });
    if(Object.keys(errors).length === 0){
      const id=this.props.match.params.id;
      if (!id) {
        this.props.onNewMovieSubmit(this.state)
      } else {
        this.props.onUpdateMovieSubmit({...this.state,id})
      }
      this.setState({ redirect:true });
    }
    
  };

  validate = () => {
    const errMessage = {};
    if (!this.state.title) errMessage.title = "Can't be blank(Title)";
    if (!this.state.cover) errMessage.cover = "Can't be blank(Cover)";
    return errMessage;
  };

  render() {
    const errorField= 
      (<Message negative>
        <Message.Header>
          Error:
        </Message.Header>
        <p>Web API Error</p>
      </Message>);
    
    const { errors } = this.state;

    const movieForm=( 
    <Form
      onSubmit={this.onSubmit}
      loading={this.props.newMovieReducer.fetching}
    >
      <Form.Field error={!!errors.title}>
        <label>Title</label>
        <input
          id="title"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder="Title ..."
        />
        {errors.title && <InlineError message={errors.title} />}
      </Form.Field>
      <Form.Field error={!!errors.cover}>
        <label>Cover Img URL</label>
        <input
          id="cover"
          name="cover"
          value={this.state.cover}
          onChange={this.handleChange}
          placeholder="Cover Img URL ..."
        />
        {errors.cover && <InlineError message={errors.cover} />}
      </Form.Field>
      <Form.Field>
        <Image src={this.state.cover} size="small" />
      </Form.Field>
      <Button color="blue" type="submit">
        Submit
      </Button>
      {
        this.props.newMovieReducer.error.response && errorField
      }
     
    </Form>
    );

console.log("NewMoviePage Props:",this.props);
    return (
      <div>
        <h2>New Movie Form</h2>
        {this.props.newMovieReducer.fetched && this.state.redirect
        ? <Redirect to="/movies"/>
      :movieForm
      }
       
      </div>
    );
  }
}
const mapStateToProps = ({newMovieReducer,moviesReducer},props)=>{
    return {newMovieReducer,
      willUpdateMovie:moviesReducer.movies
      .find(item => item.id === props.match.params.id)}
}

const mapDispatchToProps = {
    onNewMovieSubmit,fetchMovie,onUpdateMovieSubmit
};

export default connect(mapStateToProps,mapDispatchToProps)(NewMoviePage)