import { NextPage } from "next";

const Home: NextPage = () => {
	return (
		<>
			<div className="landing">
				<h1>Preserved for the future.</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam
				</p>
				<div>
					<a className="link">Check out the database &#8594;</a>
				</div>
				<br />
				<br />
			</div>
			{/* <section>
				<h2>Latest Posts</h2>
			</section> */}
		</>
	);
};

export default Home;
