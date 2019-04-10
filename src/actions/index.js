const booksLoaded = (newBooks) => {
	return {
		type: 'FETCH_BOOKS_SUCCESS',
		payload: newBooks
	}
};

const booksRequested = () => {
	return {
		type: 'FETCH_BOOKS_REQUEST'
	}
};

const booksError = (error) => {
	return {
		type: 'FETCH_BOOKS_FAILURE',
		payload: error
	}
};

export const bookAddedToCart = (bookId) => {
	return {
		type: 'BOOK_ADDED_TO_CART',
		payload: bookId
	}
};

const fetchBooks = (bookstoreService, dispatch) => () => { // не хотим чтобы компонент зависел от параметров поэтому передаем только в первую функцию
	dispatch(booksRequested());
	bookstoreService.getBooks()
		.then((data) => {
			// 2. передаем действия в store с помощью dispatch
			dispatch(booksLoaded(data));
		})
		.catch((err) => dispatch(booksError(err)));
};

export {
	fetchBooks
}