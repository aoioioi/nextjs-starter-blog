import { useRouter } from 'next/router';
import { HiOutlineChevronLeft } from 'react-icons/hi';

function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="mb-10 text-sm flex items-center"
    >
      <HiOutlineChevronLeft className="text-lg mr-2" />{' '} Back
    </button>
  );
}

export default BackButton;
