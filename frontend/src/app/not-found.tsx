/* eslint-disable max-len */
import Image from 'next/image';
import pageNotFound from '../../public/pageNotFound.svg';

function PageNotFound() {
  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-light-neutral-150">

      <Image src={ pageNotFound } alt="Page not found" />

      <h1 className="text-h1 text-black-neutral">Page not found</h1>

      <p className="text-dark-neutral-450 text:sm">The requested URL was not found </p>

    </div>

  );
}

export default PageNotFound;
