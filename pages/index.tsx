import Link from "next/link";
import { Post } from "../components/blog/Post";

const Home = () => {
	const Posts = [
		{
			title: "test",
			description:
				"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
			id: "a",
			image: "https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png",
		},
		{
			title: "test 2",
			description: "",
			id: "a",
			image: "https://www.cliffrailwaylynton.co.uk/wp-content/uploads/2018/01/250x250-Placeholder.png",
		},
	];

	return (
		<div>
			<div id="about-us">
				<div className="header-2">What is dvdb?</div>
				<div
					className="after-header"
					style={{ fontSize: "var(--size-2)" }}
				>
					<p>
						Sed ut perspiciatis unde omnis iste natus error sit
						voluptatem accusantium doloremque laudantium, totam rem
						aperiam, eaque ipsa quae ab illo inventore veritatis et
						quasi architecto beatae vitae dicta sunt explicabo. Nemo
						enim ipsam voluptatem quia voluptas sit aspernatur aut
						odit aut fugit, sed quia consequuntur magni dolores eos
						qui ratione voluptatem sequi nesciunt. Neque porro
						quisquam est, qui dolorem ipsum quia dolor sit amet,
						consectetur, adipisci velit, sed quia non numquam eius
						modi tempora incidunt ut labore et dolore magnam aliquam
						quaerat voluptatem. Ut enim ad minima veniam, quis
						nostrum exercitationem ullam corporis suscipit
						laboriosam, nisi ut aliquid ex ea commodi consequatur?
						Quis autem vel eum iure reprehenderit qui in ea
						voluptate velit esse quam nihil molestiae consequatur,
						vel illum qui dolorem eum fugiat quo voluptas nulla
						pariatur?
						<span id="link">
							<Link href="/about-us">Learn More</Link>
						</span>
					</p>
				</div>
			</div>
			<div className="header">Recent Posts</div>
			<div id="postList" className="after-header">
				{Posts.map((post, index) => (
					<Post key={index} {...post} />
				))}
			</div>
			<div className="header">Recent Additions</div>
			<div className="after-header"></div>
		</div>
	);
};
export default Home;
