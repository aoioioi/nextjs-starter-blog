import Head from 'next/head';

function Metadata({ title }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}

export default Metadata;
