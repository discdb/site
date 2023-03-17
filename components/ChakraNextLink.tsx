import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { forwardRef } from 'react';

type ChakraLinkAndNextProps = ChakraLinkProps & LinkProps;

const ChakraNextLink: any = forwardRef(
	({ href, children, ...props }: ChakraLinkAndNextProps, ref: any) => {
		return (
			<Link href={href} passHref>
				<ChakraLink ref={ref} {...props} textDecoration="none !important">
					{children}
				</ChakraLink>
			</Link>
		);
	}
);

export default ChakraNextLink;
