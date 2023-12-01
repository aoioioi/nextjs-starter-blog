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
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'tags'
  ]);

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

  const postIndex = allPosts.findIndex((post) => post.slug === params.slug);
  const previousPost = allPosts[postIndex + 1] || null;
  const nextPost = allPosts[postIndex - 1] || null;

  let relatedPosts = [];
  const mainTag = post.tags[0];
  const secondaryTag = post.tags[1] || null;

  allPosts.map(p => {
    p.tags.forEach(postTag => {
      if (p.slug !== post.slug && ((postTag === mainTag || postTag === secondaryTag) && !relatedPosts.includes(p))) {
        relatedPosts.push(p);
      }
    });
  });

  return {
    props: {
      post: {
        ...post,
        content,
        previousPost,
        nextPost,
        relatedPosts: relatedPosts.reverse().slice(0, 2)
      },
    },
  };
}

function Post({ post }) {
  return (
    <>
      <Metadata title={post.title} />
      <Header />

      <main className="max-w-[44rem] mx-auto mt-24">
        <div className="mx-6">
          <PostDetail
            title={post.title}
            author={post.author}
            date={post.date}
            content={post.content}
            tags={post.tags}
            previousPost={post.previousPost}
            nextPost={post.nextPost}
            relatedPosts={post.relatedPosts}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Post;
