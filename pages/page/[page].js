import { useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Metadata from '../../components/Metadata';
import Posts from '../../components/Posts';
import Pagination from '../../components/Pagination';

import { getAllPosts } from '../../lib/api';
import { POSTS_PER_PAGE } from '../index';
import { HiOutlineX } from 'react-icons/hi';

export async function getStaticPaths() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ]);
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { page } = params;

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

  const pageNumber = parseInt(page);
  const initialDisplayPosts = allPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  );
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(allPosts.length / POSTS_PER_PAGE)
  };

  return {
    props: {
      allPosts,
      initialDisplayPosts,
      pagination
    },
  };
}

function Page({ allPosts, initialDisplayPosts, pagination }) {
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
          <div className="flex items-center p-3 rounded-lg max-w-[20rem] border mb-6">
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

          {(query && filteredPosts.length === 0) &&
            <p className="text-2xl mt-5 mb-64">No posts found</p>}
          {query &&
            <Posts posts={filteredPosts} />}
          {!query &&
            <Posts posts={initialDisplayPosts} />}

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

export default Page;
