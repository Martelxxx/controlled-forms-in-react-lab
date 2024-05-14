import { useState } from 'react';

const bookshelf = () => {

    const [header, setHeader] = useState('Add a Book');

    const [newBook, setNewBook] = useState({ title: '', author: '' });

    const [books, setBooks] = useState([
    { title: 'Fourth Wing', author: 'Rebecca Yarros' },
    { title: 'The Lion, the Witch and the Wardrobe', author: 'C.S. Lewis' },
  ]);

  const [errors, setErrors] = useState({
    title: '',
    author: '',
  });
  

  const checkErrors = ({ target }) => {
    if (target.name === 'title') {
      setErrors({
        ...errors,
        title:
          target.value.length < 3
            ? 'Title must be at least three characters long.'
            : '',
      });
    }
    if (target.name === 'author') {
      setErrors({
        ...errors,
        author:
          target.value.length < 2
            ? 'Author name must be at least two characters long.'
            : '',
      });
    }
};

const handleInputChange = (event) => {
    setNewBook({
        ...newBook, 
         [event.target.name]: event.target.value 
        });
        checkErrors(event);
    };

const handleSubmit = (event) => {
    event.preventDefault();
    setBooks([...books, newBook]);
    setHeader(`${newBook.title} by ${newBook.author} has been added to the bookshelf.`);
    setNewBook({ 
        title: '', 
        author: '' });
        }

const handleDelete = (indexToDelete) => {
    setBooks(books.filter((book, index) => index !== indexToDelete));
    };

    const formIsInvalid = Object.values(errors).some(Boolean);
    const formHasMissingData = !Object.values(newBook).every(Boolean);

    return (
        <>
        <div className='mainDiv'>
        <div className="bookshelfDiv">
                    <h3>{header}</h3>
                    <form onSubmit={handleSubmit}>
                    <div className="bookDiv">
                    <label htmlFor="title">Book Title: </label>
                    <input 
                    id="title" 
                    name="title"
                    onChange={handleInputChange} 
                    value={newBook.title}
                    />
                    {errors.title && <p className='error'>{errors.title}</p>}
                    </div>
              
                    <div className="authorDiv">
                    <label htmlFor="title">Author: </label>
                    <input 
                    type="text" 
                    id="author" 
                    name="author" 
                    value={newBook.author}
                    onChange={handleInputChange}
                    />
                    {errors.author && <p className='error'>{errors.author}</p>}
                    </div>
               
       
        <button type="submit" disabled={formIsInvalid || formHasMissingData}>Add Book</button>
        </form>
        </div>
        <div className="bookCardsDiv">
        {books.map((book, index) => (
            <div key={index} className="bookCard">
            <h4>{book.title}</h4>
            <p>by {book.author}</p>
            <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
        ))}
        </div>
</div>
        
       </> 
    )
};

export default bookshelf;
