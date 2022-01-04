import { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<meta content="dvdb" property="og:title" />
				<meta
					content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
					do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam"
					name="og:description"
				/>
			</Head>
			<div className="landing">
				<div>
					<h1>Preserved for the future.</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam
					</p>
					<div>
						<Link href="/media">
							<a className="link">
								Check out the database &#8594;
							</a>
						</Link>
					</div>
				</div>

				{/* <div>
					<img src="home-graphic.png" />
				</div> */}
			</div>
		</>
	);
};

export default Home;
