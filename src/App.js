
import { useEffect, useContext } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import BooksContext from './context/books';


function App() {

    const { fetchBooks } = useContext(BooksContext);
    

    useEffect(() => {
        fetchBooks()
    }, []);

   /*With useEffect, the SECOND ARGUMENT in this case [] is VERY significant.
    in this case (an empty array) the second argument indicates that the arrow
    function will be called after the initial render, and never called again*/
 

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList />
            <BookCreate />
        </div>
    );
}

export default App;