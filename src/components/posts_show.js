import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchPost(id);
	}

	OnDeleteClick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render() {
		const { post } = this.props;
		if (!post) {
			return <div>Loading...</div>;
		}

		return (
			<div>
				<Link className="btn btn-primary" to="/">
					Home
				</Link>
				<button
					className="btn btn-danger pull-xs-right"
					onClick={this.OnDeleteClick.bind(this)}
				>
					Delete Post
				</button>
				<h2>{post.title}</h2>
				<h6>{post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

const mapStateToProps = ({ posts }, ownProps) => {
	return { post: posts[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
