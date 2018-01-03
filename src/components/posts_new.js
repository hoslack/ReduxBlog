import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) {
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input type="text" {...field.input} className="form-control" />
				{field.meta.error}
			</div>
		);
	}

	render() {
		return (
			<div>
				<form>
					<Field label="Title" name="title" component={this.renderField} />
					<Field label="Categories" name="categories" component={this.renderField} />
					<Field label="Content" name="content" component={this.renderField} />
					<button type="submit" className="btn btn-primary">
						Submit
					</button>
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
};

export default reduxForm({
	validate,
	form: 'PostsNewForm',
})(PostsNew);
