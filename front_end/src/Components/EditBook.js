import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditExercise extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            genre: '',
            date: ''
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onChange = function(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onClick = function() {
        /*e not needed. it will not allow information to be passed because
        link will activate first?*/
        
        //e.preventDefault();
        
        const editBook = {
            //don't forget the _ in _id
            _id: this.props.match.params._id,
            title: this.state.title,
            author: this.state.author,
            genre: this.state.genre,
            date: this.state.date
        }
        this.props.updateBook(editBook);
    }

    render() {

        console.log(this.props.match.params._id)
        return (
            <form>
                <div className="form-group">
                    <label>Title </label>
                    <input type="text" className="form-control" 
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Author </label>
                    <input type="text" className="form-control" 
                    id="exampleFormControlInput1" 
                    placeholder={this.props.authors.map(author => {
                        if(author._id == this.props.match.params._id) {
                            return author.author
                        }
                    })}
                    name="author"
                    value={this.state.author}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" className="form-control" 
                    name="genre"
                    value={this.state.genre}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label>Publication Date</label>
                    <input type="text" className="form-control" 
                    name="date"
                    value={this.state.date}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <Link to="/" onClick={this.onClick}>
                        <input type="submit" className="form-control bg-primary"
                        style={{color:"white"}}
                        value="submit"/>
                    </Link>
                </div>
            </form>
        )
    }
}

export default EditExercise