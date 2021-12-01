import Link from 'next/link';

function PostItem({
  title,
  author,
  date,
  slug,
  excerpt,
  coverImage
}) {
  return (
    <div className="mt-4 mb-14 border-t border-gray-400 pt-10">
      {coverImage &&
        <Link as={`/p/${slug}`} href="/p/[slug]">
          <img src={coverImage} alt="" className="cursor-pointer mb-2" />
        </Link>
      }
      
      <Link as={`/p/${slug}`} href="/p/[slug]">{title}</Link>
      <p className="mt-2 mb-4 text-sm text-gray-400">{author.name} | {date}</p>
      <p className="max-w-[44rem]">{excerpt}</p>
    </div>
  );
}

export default PostItem;
