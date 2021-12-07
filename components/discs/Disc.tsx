import { DiscType } from "../types/Disc";
// import { Link } from "react-router-dom";
import "./Disc.css";

export const DiscPage = ({ title, image, description, id }: DiscType) => {
	return (
		<div id="post">
			{/* <Link to={`discs/${id}`}>
				<div>
					<div className="news-left">
						<img src={image} alt="" width="100px" height="100px" />
					</div>
					<div className="news-right">
						<div className="title header-2">{title}</div>

						<div className="description">{description}</div>
					</div>
				</div>
			</Link> */}
		</div>
	);
};
