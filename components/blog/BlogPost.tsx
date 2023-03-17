import { Badge, Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import { memo } from 'react';
import removeMd from 'remove-markdown';

import { BlogPostType } from '../../types/BlogPost';

export const BlogPost = memo(({ post }: { post: BlogPostType }) => {
	const isNewPost = () => {
		const postDate = new Date(post.createdAt).getTime();

		const oneDay = Date.now() - 1 * 24 * 60 * 60 * 1000;

		return oneDay < postDate;
	};

	const newPost = isNewPost();

	return (
		<NextLink passHref href={`/blog/${post.id}`}>
			<Box
				borderWidth="1px"
				borderRadius="lg"
				overflow="hidden"
				bg="white"
				as={motion.a}
				whileHover={{ scale: 1.025 }}
			>
				<Image src={post.image} alt="" />
				<Box p="6">
					<Box display="flex" alignItems="baseline">
						{newPost && (
							<Badge borderRadius="full" px="2" colorScheme="teal">
								New
							</Badge>
						)}
					</Box>
					<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
						{post.title}
					</Box>
					<Box>
						{removeMd(post.body).substring(0, 125)} {post.body.length > 125 && '...'}
					</Box>
				</Box>
			</Box>
		</NextLink>
	);
});
