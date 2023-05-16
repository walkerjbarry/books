import { createContext, useState, useCallback } from 'react';
import axios from 'axios';


const BooksContext = createContext();

function Provider({ children }) {

    const [books, setBooks] = useState([]);


    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    }, []);
    /*useCallback is a Hook that assists with fixing bugs around the use of 
     * useEffect(like infinite loops), and other similar situations.
     * Just like with useEffect, the second argument in useCallback is very significant.*/

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });


        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data };
            }

            return book;
        });

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    const createBook = async (title) => {

        const response = await axios.post('http://localhost:3001/books', {
            title
        });
        //remember: when key/value pairs are the same (as "title" above), you can just include them once in the argument as I've done here - in this case the value of the title key will be the title argument that is passed in

        const updatedBooks = [...books, response.data
        ];
        setBooks(updatedBooks);
    }; 

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };

    return <BooksContext.Provider value={valueToShare}>{ children }</BooksContext.Provider>;
}

export { Provider };
export default BooksContext;


