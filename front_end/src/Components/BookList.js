import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class BookList extends Component {

  
  render() {
    const { books, deleteBook } = this.props;
    return(
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Autho</th>
              <th scope="col">Genre</th>
              <th scope="col">Date</th>
              <th scope="col">Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
          {books.map(book => (
            //the key should be for <React.Fragment> not for <tr>
            <React.Fragment key={book._id}>
              <tr>
                <td> {book.title} </td>
                <td> {book.author} </td>
                <td> {book.genre} </td>
                <td> {book.date} </td> 
                <td> 
                  <Link to={`/edit/${book._id}`} style={{color:'white'}} 
                  className="form-control bg-primary ">Edit
                  </Link> 
                  <button style={{color:'white'}} onClick={deleteBook.bind(this, book)} 
                  className="form-control bg-danger ">Delete
                  </button> 
                </td>
              </tr>
            </React.Fragment>)
          )}
          </tbody>
        </table>
      </React.Fragment> 
    )  
  }
}

export default BookList 

