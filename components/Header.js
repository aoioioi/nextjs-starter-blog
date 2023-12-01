import { useState } from 'react';
import Link from 'next/link';

function Header() {
  const [scrollY, setScrollY] = useState(0);

  if (typeof window === 'object') {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <header
      className={`fixed w-full top-0 z-50 py-4 text-gray-700 border-b border-gray-300 bg-white-300
      ${scrollY > 30
          ? 'md:opacity-[85%] bg-white'
          : 'bg-white'} 
          transition duration-75'`
      }
    >
      <div className="xl:max-w-screen-xl mx-auto">
        <div className="mx-6 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80">
            Next.js Blog
          </Link>
          <div className="space-x-8">
            <Link
              href="/"
              className="hover:underline"
            >
              Blog
            </Link>
            <Link
              href="/tags"
              className="hover:underline"
            >
              Tags
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
