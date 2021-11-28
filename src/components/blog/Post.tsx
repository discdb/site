import { BlogPost } from "../types/Post";
import { Link } from "react-router-dom";
import "./Post.css";

export const Post = ({ title, image, description, id }: BlogPost) => {
	return (
		<div id="post">
			<Link to={`blog/${id}`}>
				<div>
					<div className="news-left">
						<img src={image} alt="" width="150px" height="150px" />
					</div>
					<div className="news-right">
						<div className="title header-2">{title}</div>
						<div className="description">{description}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
