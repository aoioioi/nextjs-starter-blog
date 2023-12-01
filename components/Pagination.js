import Link from 'next/link';
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi";

function Pagination({ currentPage, totalPages }) {
  const prevPage = parseInt(currentPage) - 1 > 0;
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages);

  return (
    <div className="mt-6 flex justify-between items-center">
      
      {!prevPage ? (
        <button rel="previous" className="text-gray-300">
        </button>
      ) : (
        <Link href={currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`}>
          <button>
            <HiOutlineArrowLeft className="text-2xl" />
          </button>
        </Link>
      )}

      <span>
        {currentPage} of {totalPages}
      </span>

      {!nextPage ? (
        <button rel="next" className="text-gray-300">
        </button>
      ) : (
        <Link href={`/page/${currentPage + 1}`}>
          <button>
            <HiOutlineArrowRight className="text-2xl" />
          </button>
        </Link>
      )}

    </div>
  );
}

export default Pagination;
