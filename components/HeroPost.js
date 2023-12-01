import Link from 'next/link';

function HeroPost({
  title,
  author,
  date,
  slug,
  excerpt,
  coverImage
}) {
  return (
    <div className="mb-10">
      <h2 className="mb-1">🌠 Featured Post</h2>
      <Link as={`/p/${slug}`} href="/p/[slug]">
        <h2 className="text-2xl font-bold cursor-pointer inline">{title}</h2>
      </Link>
      <p className="mt-2 mb-4 text-sm text-gray-400">{author.name} | {date}</p>
      {coverImage &&
        (
          <Link as={`/p/${slug}`} href="/p/[slug]">
            <img src={coverImage} alt={coverImage} className="cursor-pointer mb-4" />
          </Link>
        )
      }
      <p className="max-w-[44rem]">{excerpt}</p>
    </div>
  );
}

export default HeroPost;
