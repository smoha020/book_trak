import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'; 
import axios from 'axios';

import Navbar from './Components/Navbar';
import BookList from './Components/BookList';
import CreateBook from './Components/CreateBook';
import EditBook from './Components/EditBook';
import CreateAuthor from './Components/CreateAuthor';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      authors: []
    }    
    this.addBook = this.addBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.addAuthor = this.addAuthor.bind(this);
  }
  
  componentDidMount() {
    axios.get('/book')
      .then(res => this.setState({books: [...res.data]}))
      .catch(err => console.log(err));
    
    axios.get('/author')
      .then(res => this.setState({authors: [...res.data]}))
      .catch(err => console.log(err));
  }

  //do not use JSON.stringify.
  addBook = function(book) {
    
    axios.post('/book', book)
    .then(res => this.setState({books: [...this.state.books, res.data]}))
      .catch(err => console.log(err));
  }

  updateBook = function(edBook) {
    console.log(edBook);
    axios.put(`/book/${edBook._id}`, edBook)
      .then(() => this.setState({books: [...this.state.books.map(book => {
        if(edBook._id === book._id) {
          book.title = edBook.title;
          book.author = edBook.author;
          book.genre = edBook.genre;
          book.date = edBook.date;
          console.log(book);
        }
        return book;
      })]}))
      .catch(err => console.log(err));
  }

  deleteBook = function(delBook) {
    console.log(delBook)
    axios.delete(`/book/${delBook._id}`)
      .then(res => this.setState({books: [...this.state.books.filter(book => (
        book._id != delBook._id
        ))]
      }))
      .catch(err => console.log(err));
  }

  addAuthor = function(newAuthor) {

    const new_id = this.state.books.map(book => {
      if(book.author == newAuthor) {
        console.log(book._id)
        return book._id
      }
    })
    
    /*I use [0] because the _id is inside of 
    an array and the _id is always the only element inside*/
    const Author = {
      _id: new_id[0],
      author: newAuthor
    }

    axios.post('/author', Author)
      .then(res => this.setState({authors: [...this.state.authors, Author]}))
      .catch(err => console.log(err));
  }

/*when rendering components we use {...props} to be able to access 
all props properties such as  props.match...etc*/
  render() {
    console.log(this.state.authors)
    return (
      <Router>
        <div className="container">
          <Navbar />
          <Route exact path="/" render={props => ( <BookList
            addBook={this.addBook}
            deleteBook={this.deleteBook}
            books={this.state.books} />) }/>
          <Route path="/create" render={props => ( <CreateBook
            addBook={this.addBook}
            authors={this.state.authors} />) }/>
          <Route path="/edit/:_id"  render={props => ( <EditBook
              {...props}
              books={this.state.books} 
              authors={this.state.authors}
              updateBook={this.updateBook}/>) }/> 
          <Route path="/author" render={props => ( <CreateAuthor
            addAuthor={this.addAuthor} />) }/>
        </div>
      </Router>
    )
  };
}

export default App;

/* 
WHAT I LEANRED 

--One advantage of fetching data from a database is that you wont
have to worry about passing data between sibling components (which 
requires redux or the context API) . if you dont know how to use 
those two then you are going to make states for almost every component 
and have very repetative code. as  a remedy, I pass in data from child 
to parent to other child. 
Example: I could not pass in the props directly from the ExerciseList 
component to the EditExercise component. instead, the EditExercise 
component had to be a direct child of the App component.


--the first option on author in the CreateExercise component was not 
selectable: add "select an option" option and make it selected 
(dafaultValue="selected") 

--in the ExerciseList component the key should be for 
<React.Fragment> not for <tr>

--calling the onClick in the EditExercise component: don't 
pass in e. no neccessity for e.preventDefault() 

--when rendering components we use {...props} to be able to access 
all props properties such as  props.match...
I needed this to extract the id from the link in the EditExercise 
component.
*/