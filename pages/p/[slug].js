import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Metadata from '../../components/Metadata';
import PostDetail from '../../components/PostDetail';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'tags'
  ]);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

function Post({ post }) {
  const router = useRouter();

  return (
    <>
      <Metadata title={post.title} />
      <Header />

      <main className="max-w-[44rem] mx-auto mt-24">
        <div className="mx-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="mb-10 text-sm flex items-center"
          >
            <HiOutlineChevronLeft className="text-lg mr-2"/>{' '} Go back
          </button>
          <PostDetail
            title={post.title}
            author={post.author}
            date={post.date}
            content={post.content}
            tags={post.tags}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Post;
