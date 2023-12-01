import Header from '../../components/Header';
import Metadata from '../../components/Metadata';
import { getAllPosts } from '../../lib/api';

import Link from 'next/link';
import titleCase from '../../lib/titleCase';
import kebabCase from '../../lib/kebabCase';
import Footer from '../../components/Footer';

export async function getStaticProps() {
  const allTags = getAllPosts([
    'tags'
  ]);

  let tagCounts = {};

  allTags.map(postTags => {
    postTags.tags.forEach(tag => {
      if (tag in tagCounts) tagCounts[tag] += 1;
      else tagCounts[tag] = 1;
    });
  });

  return {
    props: {
      tagCounts
    }
  };
}

function index({ tagCounts }) {
  const sorted = Object.keys(tagCounts).sort();

  return (
    <>
      <Metadata title="All Tags" />

      <Header />
      <main className="max-w-screen-xl mx-auto mt-24">
        <div className="mx-6">
          <h2 className="text-2xl mb-8">All Tags</h2>
          <div className="grid grid-cols-2 gap-y-3">
            {sorted.map(tag => (
              <div className="w-full flex" key={tag}>
                <Link
                  href="/tags/[tag]"
                  as={`/tags/${kebabCase(tag)}`}
                  className="hover:underline w-full"
                >
                  {titleCase(tag)} ({tagCounts[tag]})
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default index;
