import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const MarkdownComponents: object = {
    p: (paragraph: { children?: boolean; node?: any }) => {
        const { node } = paragraph;

        if (node.children[0].tagName === "img") {
            const image = node.children[0];
            const metastring = image.properties.alt;
            const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
            const metaMeasurements = metastring.match(/{([^}]+)x([^}]+)}/);
            const width = metaMeasurements ? metaMeasurements[1] : "720";
            const height = metaMeasurements ? metaMeasurements[2] : "480";
            const isPriority = metastring?.toLowerCase().match("{priority}");
            const hasCaption = metastring?.toLowerCase().includes("{caption:");
            const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

            return (
                <div className="postImgWrapper">
                    <Image
                        src={image.properties.src}
                        width={width}
                        height={height}
                        className="postImg"
                        alt={alt}
                        priority={isPriority}
                    />
                    {hasCaption ? (
                        <div className="caption" aria-label={caption}>
                            {caption}
                        </div>
                    ) : null}
                </div>
            );
        }
        return <p>{paragraph.children}</p>;
    },
};

export const Markdown = ({ children }: { children: string }) => {
    return (
        <ReactMarkdown
            disallowedElements={["script", "iframe", "meta"]}
            className="react-markdown"
            components={{ ...ChakraUIRenderer(), ...MarkdownComponents }}
            remarkPlugins={[remarkGfm]}
            skipHtml
            children={children}
        />
    );
};
