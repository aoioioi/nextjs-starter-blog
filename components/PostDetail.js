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
    <div className="lg:grid lg:grid-cols-4 gap-x-6">
      <div className="col-span-3 max-w-[41rem] mx-auto">
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

        <div className="border-t border-gray-400 mt-8 flex justify-between space-x-14 text-sm lg:hidden">
          {nextPost ?
            <div>
              <h3 className="py-2 flex items-center">
                <HiArrowCircleLeft className="text-[18px] mr-1" /> Newer post
              </h3>
              <Link href={`/p/${nextPost.slug}`}>
                <a className="group">
                  {nextPost.coverImage &&
                    <img src={nextPost.coverImage} alt="" className="w-40 mb-1" />
                  }
                  <p className="group-hover:underline">{nextPost.title}</p>

                  <p>{nextPost.author.name}</p>
                  <p>{nextPost.date}</p>
                </a>
              </Link>
            </div> : <div />
          }

          {previousPost &&
            <div>
              <h3 className="py-2 flex items-center justify-end">
                Older post <HiArrowCircleRight className="!text-[18px] ml-1" />
              </h3>
              <Link href={`/p/${previousPost.slug}`}>
                <a className="text-right group">
                  {previousPost.coverImage &&
                    <img src={previousPost.coverImage} alt="" className="w-40 mb-1" />
                  }
                  <p className="group-hover:underline">{previousPost.title}</p>

                  <p>{previousPost.author.name}</p>
                  <p>{previousPost.date}</p>
                </a>
              </Link>
            </div>
          }
        </div>

        <div className="border-t border-gray-400 mt-8 text-sm space-y-1 lg:hidden">
          <h3 className="py-2">Related</h3>
          {relatedPosts.length === 0 && 'No related posts'}
          {relatedPosts.length > 0 && relatedPosts.map(related => (
            <Link key={related.slug} href={`/p/${related.slug}`}>
              <a className="block hover:underline">
                {related.title}
              </a>
            </Link>
          ))}
        </div>
      </div>

      <div className="text-sm hidden mt-32 lg:block space-y-1 col-span-1">
        {nextPost &&
          <div className="pb-4">
            <h3 className="pb-2">
              Newer post
            </h3>
            <Link href={`/p/${nextPost.slug}`}>
              <a className="group">
                {nextPost.coverImage &&
                  <img src={nextPost.coverImage} alt="" className="w-40 mb-1" />
                }
                <p className="group-hover:underline">{nextPost.title}</p>

                <p>{nextPost.author.name}</p>
                <p>{nextPost.date}</p>
              </a>
            </Link>
          </div>}

        {previousPost &&
          <div className="">
            <h3 className="py-2">
              Older post
            </h3>
            <Link href={`/p/${previousPost.slug}`}>
              <a className="group">
                {previousPost.coverImage &&
                  <img src={previousPost.coverImage} alt="" className="w-40 mb-1" />
                }
                <p className="group-hover:underline">{previousPost.title}</p>

                <p>{previousPost.author.name}</p>
                <p>{previousPost.date}</p>
              </a>
            </Link>
          </div>}

        <h3 className="pt-8 pb-2">Related</h3>
        {relatedPosts.length === 0 && 'No related posts'}
        {relatedPosts.map(related => (
          <Link key={related.slug} href={`/p/${related.slug}`}>
            <a className="block hover:underline">
              {related.title}
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
