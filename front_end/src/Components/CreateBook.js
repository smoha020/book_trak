import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Axios from 'axios';

class CreateExercise extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            author: '',
            genre: '',
            date: '',
            authors: []
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        console.log(this.props.authors);
    }

    onChange = function(e) {
        this.setState({ [e.target.name]: e.target.value})
    }

    onClick = function() {

        const newBook = {
            title: this.state.title,
            author: this.state.author,
            genre: this.state.genre,
            date: this.state.date
        }
        this.props.addBook(newBook);
    }

    render() {
        console.log(this.props.authors)
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
                    <label>Select Author (Add Author if none)</label>
                    <select className="form-control" 
                    id="exampleFormControlSelect1"
                    name="author"
                    value={this.state.author}
                    onChange={this.onChange}>
                        <option defaultValue="selected">
                            Select an option
                        </option>
                        {this.props.authors.map(author => (
                           <option 
                           key={uuidv4()}> {author.author} </option> 
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" className="form-control" 
                    name="genre"
                    value={this.state.genre}
                    onChange={this.onChange}/>
                </div>
                <div className="form-group">
                    <label> Publication Date </label>
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

export default CreateExercise 