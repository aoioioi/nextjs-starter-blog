import Link from 'next/link';
import { HiArrowCircleLeft, HiArrowCircleRight } from 'react-icons/hi';
import kebabCase from '../lib/kebabCase';
import BackButton from './BackButton';

function PostDetail({
  title,
  author,
  date,
  content,
  tags,
  previousPost,
  nextPost,
  relatedPosts
}) {
  return (
    <>

      <BackButton />

      <div className="mb-6">
        <h2 className="text-2xl mb-1">{title}</h2>
        <p className="text-gray-400 text-sm">{author.name} | {date}</p>
      </div>

      <article className="prose max-w-none leading-normal">
        <div
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>

      <div className="flex items-center mt-14 text-sm">
        <p className="mr-4 text-gray-400">Tags:</p>
        <div className="flex space-x-4">
          {tags.map(tag =>
            <Link
              key={tag}
              href="/tags/[tag]"
              as={`/tags/${kebabCase(tag)}`}
            >
              <div className="border cursor-pointer rounded-full px-3 pt-1 pb-2">
                {tag}
              </div>
            </Link>
          )}
        </div>
      </div>

      <div className="border-t border-gray-400 mt-8 flex justify-between space-x-14 text-sm">
        {nextPost ?
          <div>
            <h3 className="py-2 flex items-center">
              <HiArrowCircleLeft className="text-[18px] mr-1" /> Next post
            </h3>
            <Link href={`/p/${nextPost.slug}`}>
              <>
                {nextPost.coverImage &&
                  <img src={nextPost.coverImage} alt="" className="w-40 mb-1" />
                }
                <p>{nextPost.title}</p>

                <p>{nextPost.author.name}</p>
                <p>{nextPost.date}</p>
              </>
            </Link>
          </div> : <div />
        }

        {previousPost &&
          <div>
            <h3 className="py-2 flex items-center justify-end">
              Previous post <HiArrowCircleRight className="!text-[18px] ml-1" />
            </h3>
            <Link href={`/p/${previousPost.slug}`} className="text-right">
              <>
                {previousPost.coverImage &&
                  <img src={previousPost.coverImage} alt="" className="w-40 mb-1" />
                }
                <p>{previousPost.title}</p>

                <p>{previousPost.author.name}</p>
                <p>{previousPost.date}</p>
              </>
            </Link>
          </div>
        }
      </div>

      {relatedPosts.length > 0 &&
        <div className="border-t border-gray-400 mt-8 text-sm space-y-1">
          <h3 className="py-2">Related</h3>
          {relatedPosts.map(related => (
            <Link
              key={related.slug}
              href={`/p/${related.slug}`}
              className="block hover:underline"
            >
              {related.title}
            </Link>
          ))}
        </div>
      }

    </>
  );
}

export default PostDetail;
