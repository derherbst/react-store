import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withBookstoreService } from '../hoc';
import { booksLoaded, booksRequested, booksError } from "../../actions";
import { compose } from "../../utils";
import Spinner from "../spinner";
import './index.scss';
import ErrorIndicator from "../error-indicator";

class BookList extends Component {

	componentDidMount() {
		// 1. получаем данные
		const { bookstoreService, booksLoaded, booksRequested, booksError } = this.props; // booksLoaded попал в пропсы из mapDispatchToProps
		booksRequested();
		bookstoreService.getBooks()
			.then((data) => {
				// 2. передаем действия в store с помощью dispatch
				booksLoaded(data);
			})
			.catch((err) => booksError(err));
	}

	render() {
		const { books, loading, error } = this.props;

		if (loading) {
			return <Spinner />
		}

		if (error) {
			return <ErrorIndicator />
		}

		return (
			<ul className='book-list'>
				{
					books.map((book) => {
						return (
							<li key={book.id}><BookListItem book={book} /></li>
						)
					})
				}
			</ul>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		books: state.books,
		loading: state.loading,
		error: state.error
	}
};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
		booksLoaded,
		booksRequested,
		booksError
	}, dispatch)

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
)(BookList);