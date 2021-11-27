import * as React from "react";
import { Post } from "../components/blog/Post";

export const Blog = () => {
	const Posts = [
		{
			title: "test",
			description: "a",
			id: "a",
			image: "https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png",
		},
	];

	return (
		<div>
			{Posts.map((post, index) => (
				<Post key={index} {...post} />
			))}
		</div>
	);
};
