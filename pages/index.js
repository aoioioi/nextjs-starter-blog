import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import HeroPost from '../components/HeroPost';
import Metadata from '../components/Metadata';
import Posts from '../components/Posts';
import { getAllPosts } from '../lib/api';

import Pagination from '../components/Pagination';

import { HiOutlineX } from 'react-icons/hi';

export const POSTS_PER_PAGE = 2;

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'content',
    'tags'
  ]);

  const initialDisplayPosts = allPosts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE)
  };

  return {
    props: { allPosts, initialDisplayPosts, pagination },
  };
}

export default function Home({
  allPosts,
  initialDisplayPosts = [],
  pagination
}) {
  const heroPost = allPosts[0];
  const [query, setQuery] = useState('');

  const filteredPosts = allPosts.filter(post => {
    const searchFields = post.title + post.content + [post.tags];
    return searchFields.toLowerCase().includes(query);
  });

  return (
    <>
      <Metadata title="Next.js Blog" />
      <Header />

      <main className="max-w-[55rem] mx-auto mt-24">
        <div className="mx-6">
          <div className="flex items-center p-3 rounded-lg max-w-[20rem] border mb-6 bg-white">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
              placeholder="Search..."
              className="outline-none w-full rounded-md"
            />
            <HiOutlineX
              className="text-xl text-gray-400 cursor-pointer -mr-1" onClick={(e) => setQuery('')}
            />
          </div>

          {(HeroPost && !query) &&
            <HeroPost
              title={heroPost.title}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              coverImage={heroPost.coverImage}
            />
          }

          {/* Posts list */}
          {(query && filteredPosts.length === 0) &&
            <p className="text-2xl mt-5 mb-64">No posts found!</p>
          }
          {!query &&
            <Posts posts={initialDisplayPosts.slice(1)} />
          }
          {query &&
            <Posts posts={filteredPosts} />
          }

          {/* Paginator */}
          {!query &&
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
            />
          }
        </div>
      </main>

      <Footer />
    </>
  );
}
