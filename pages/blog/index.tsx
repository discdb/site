import { Post } from "../../components/blog/Post";

const Blog = () => {
	const Posts = [
		{
			title: "test",
			body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
			identifier: "a",
			image: "https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png",
			// created_time: new Date(),
			// created_by: {},
		},
		{
			title: "test 2",
			body: "",
			identifier: "a",
			image: "https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png",
		},
	];

	return (
		<div>
			<div className="header">Blog</div>
			<div id="postList">
				{Posts.map((post, index) => (
					<Post key={index} {...post} />
				))}
			</div>
		</div>
	);
};
export default Blog;
