import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
import './index.scss';
import ErrorIndicator from "../error-indicator";

const BookList = ({ books, onAddedToCart }) => {
	return (
		<ul className='book-list'>
			{
				books.map((book) => {
					return (
						<li key={book.id}>
							<BookListItem
								book={book}
								onAddedToCart={() => onAddedToCart(book.id)}
							/>
						</li>
					)
				})
			}
		</ul>
	)
};

class BookListContainer extends Component {

	componentDidMount() {
		this.props.fetchBooks()
	}

	render() {
		const { books, loading, error, onAddedToCart } = this.props;

		if (loading) {
			return <Spinner />
		}

		if (error) {
			return <ErrorIndicator />
		}

		return <BookList books={books} onAddedToCart={onAddedToCart} />
	}
}

const mapStateToProps = (state) => {
	return {
		books: state.books,
		loading: state.loading,
		error: state.error
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {

	const { bookstoreService } = ownProps; // ownProps это свойство компонента, которое он получил сверху от др комп (withBookstoreService)

	return {
		fetchBooks: fetchBooks(bookstoreService, dispatch),
		onAddedToCart: (id) => dispatch(bookAddedToCart(id))
	}

	// return bindActionCreators({
	// 	booksLoaded,
	// 	booksRequested,
	// 	booksError
	// }, dispatch)

	// return {
	// 	booksLoaded: (newBooks) => {
	// 		dispatch(booksLoaded(newBooks))
	// 	}
	// }
};

// можно еще короче
// const mapDispatchToProps = {
// 	booksLoaded
// };

export default compose(
	withBookstoreService(),
	connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer);