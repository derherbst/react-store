import React, { Component } from 'react';
import BookListItem from '../book-list-item';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { withBookstoreService } from '../hoc';
import { booksLoaded } from "../../actions";
import { compose } from "../../utils";
import './index.scss';

class BookList extends Component {

	componentDidMount() {
		// 1. получаем данные
		const { bookstoreService } = this.props;
		const data = bookstoreService.getBooks();

		console.log(data);

		// 2. передаем действия в store с помощью dispatch
		this.props.booksLoaded(data);

	}

	render() {
		const { books } = this.props;
		return (
			<ul>
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
		books: state.books
	}
};

const mapDispatchToProps = (dispatch) => {

	return bindActionCreators({
		booksLoaded
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
	withBookstoreService,
	connect(mapStateToProps, mapDispatchToProps)
)(BookList);