import Link from 'next/link';
import kebabCase from '../lib/kebabCase';

function PostDetail({
  title,
  author,
  date,
  content,
  tags
}) {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl mb-1">{title}</h2>
        <p className="text-gray-400 text-sm">{author.name} | {date}</p>
      </div>
      <article className="prose leading-normal">
        <div
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <div className="flex items-center mt-14 text-sm">
        <span className="mr-4 text-gray-400">Tags:</span>
        <div className="flex space-x-4 -mb-1">
          {tags.map(tag => <Link href="/tags/[tag]" as={`/tags/${kebabCase(tag)}`}>
            <div className="border cursor-pointer rounded-full px-3 pt-1 pb-2">
              {tag}
            </div>
          </Link>)}
        </div>
      </div>
    </>
  );
}

export default PostDetail;
