import { CreatedByType } from './User';

export interface BlogPostType {
	title: string;
	image: string;
	body: string;
	createdAt: Date;
	createdBy: CreatedByType;
	id: string;
}
