import BackButton from '../../components/BackButton';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Metadata from '../../components/Metadata';
import Posts from '../../components/Posts';
import { getAllPosts } from '../../lib/api';

import kebabCase from '../../lib/kebabCase';
import titleCase from '../../lib/titleCase';

export async function getStaticPaths() {
  const posts = getAllPosts(['tags']);

  let postTags = [];

  posts.map(post => {
    post.tags.forEach(postTag => {
      const tagPath = {
        params: {
          tag: kebabCase(postTag)
        }
      };
      postTags.push(tagPath);
    });
  });

  return {
    paths: postTags,
    // Other routes get 404
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
    'excerpt',
    'content',
    'tags'
  ])
    .filter(post => {
      return post.tags.includes(params.tag.split('-').join(' '));
    });

  return {
    props: {
      allPosts,
      activeTag: params.tag
    }
  };
}

function Tagged({ allPosts, activeTag }) {
  const taggedPosts = allPosts;

  return (
    <>
      <Metadata title={`Tagged: ${titleCase(activeTag.split('-').join(' '))}`} />
      <Header />

      <main className="max-w-[44rem] mx-auto mt-24">
        <div className="mx-6">
          <BackButton />
          <h2>Tagged: {titleCase(activeTag.split('-').join(' '))}</h2>
          <Posts posts={taggedPosts} />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Tagged;
