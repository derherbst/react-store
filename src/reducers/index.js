const initialState = {
	books: [],
	loading: true,
	error: null,
	cartItems: [],
	orderTotal: 220
};

const updateCartItems = (cartItems, item, index) => {
	if (index === -1) {
		return [
			...cartItems,
			item
		]
	}

	return [
		...cartItems.slice(0, index),
		item,
		...cartItems.slice(index + 1),
	]
};

const updateCartItem = (book, item = {}) => {

	const { id = book.id, count = 0, title = book.title, total = 0 } = item;

	return {
		id,
		title,
		count: count + 1,
		total: total + book.price
	};

	// if (item) {
	// 	return {
	// 		...item,
	// 		count: item.count + 1,
	// 		total: item.total + book.price
	// 	};
	// } else {
	// 	return {
	// 		id: book.id,
	// 		title: book.title,
	// 		count: 1,
	// 		total: book.price
	// 	};
	// }
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'FETCH_BOOKS_REQUEST':
			return {
				...state,
				books: [], // либо spread ...state
				loading: true,
				error: null
			};
		case 'FETCH_BOOKS_SUCCESS':
			return {
				...state,
				books: action.payload,
				loading: false,
				error: null
			};
		case 'FETCH_BOOKS_FAILURE':
			return {
				...state,
				books: [],
				loading: false,
				error: action.payload
			};
		case 'BOOK_ADDED_TO_CART':
			const bookID = action.payload;
			const book = state.books.find((book) => book.id === bookID);
			const itemIndex = state.cartItems.findIndex(({id}) => id === bookID);
			const item = state.cartItems[itemIndex];

			const newItem = updateCartItem(book, item);

			return {
				...state,
				cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
			};

			// const newBook = state.cartItems.filter((book) => {
			// 	return book.id === newItem.id;
			// });

			// if (newBook) {
			// 	newItem.count++
			// }
		default:
			return state;
	}
};

export default reducer;