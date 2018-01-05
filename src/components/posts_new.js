import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class PostsNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			<div className={className}>
				<label>{field.label}</label>
				<input type="text" {...field.input} className="form-control" />
				<div className="text-help">{touched ? error : ''}</div>
			</div>
		);
	}
	onSubmit(values) {
		this.props.createPosts(values, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field label="Title" name="title" component={this.renderField} />
					<Field label="Categories" name="categories" component={this.renderField} />
					<Field label="Content" name="content" component={this.renderField} />
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
					<Link className="btn btn-danger" to="/">
						Cancel
					</Link>
				</form>
			</div>
		);
	}
}

const validate = values => {
	const errors = {};

	if (!values.title) {
		errors.title = 'Please Enter a Title';
	}
	if (!values.categories) {
		errors.categories = 'Please Enter a Category';
	}
	if (!values.content) {
		errors.content = 'Please Enter a Content';
	}
	return errors;
};

export default reduxForm({
	validate,
	form: 'PostsNewForm',
})(connect(null, { createPosts })(PostsNew));
