import { BlogPost } from "../types/Post";
import { Link } from "react-router-dom";
import "./Post.css";

export const Post = ({ title, image, description, id }: BlogPost) => {
	return (
		<div id="post">
			<Link to={`blog/${id}`}>
				<div>
					<div className="news-left">
						<img src={image} alt="" />
					</div>
					<div className="news-right">
						<div className="title">{title}</div>
						<div className="description">{description}</div>
					</div>
				</div>
			</Link>
		</div>
	);
};
