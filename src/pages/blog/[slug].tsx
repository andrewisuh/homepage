import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Header from '../../components/header';
import { getPostBySlug, getAllPosts } from '../../util/post-helpers';
import { mdxSerialize } from '../../util/mdx';
import Head from 'next/head';
import DateFormatter from '../../components/date-formatter';
import { ImArrowLeft2 } from 'react-icons/im';
import { HiOutlineArrowNarrowUp } from 'react-icons/hi';
import { MdDateRange } from 'react-icons/md';
import PostData from '../../interfaces/post-data';
import Image from 'next/image';
import Link from 'next/link';
import LikeButton from '../../components/like-button';
import { getBaseurl } from '../../util/constants';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import MdxRenderer from '../../components/mdx-renderer';
import ScrollUpButton from '../../components/scroll-up-button';

type Props = {
  metadata: PostData;
  mdxSerialized: MDXRemoteSerializeResult;
};

export default function Post({ metadata, mdxSerialized }: Props) {
  const router = useRouter();
  if (!router.isFallback && !metadata?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return router.isFallback ? (
    <h1>Loading…</h1>
  ) : (
    <>
      <Head>
        <title>{`${metadata.title} | joinemm.dev`}</title>
        <meta name="description" content={metadata.excerpt} />

        {/* Twitter */}
        <meta name="twitter:card" content={metadata.excerpt} key="twcard" />
        <meta name="twitter:creator" content="Joinemm" key="twhandle" />

        {/* Open Graph */}
        <meta property="og:url" content={`${getBaseurl()}${router.asPath}`} key="ogurl" />
        <meta property="og:image" content={`${getBaseurl()}${metadata.image}`} key="ogimage" />
        <meta property="og:site_name" content="joinemm.dev" key="ogsitename" />
        <meta property="og:title" content={metadata.title} key="ogtitle" />
        <meta property="og:description" content={metadata.excerpt} key="ogdesc" />
      </Head>
      <Header />
      <article className="m-auto max-w-3xl px-4 pt-8">
        <div className="flex justify-between">
          <Link href="/blog" className="flex items-center gap-2 underline-offset-4 hover:underline">
            <ImArrowLeft2 size={20} className="inline-block" />
            <p>All posts</p>
          </Link>
          <div className="flex items-center gap-2">
            <DateFormatter dateString={metadata.date}></DateFormatter>{' '}
            <MdDateRange size={20} className="inline-block" />
          </div>
        </div>
        <div className="pt-4">
          {metadata.image ? (
            <div className="">
              <Image
                // a little hack to make the nextjs Image height variable
                className="!relative !h-[unset] !w-full rounded-lg object-contain"
                src={metadata.image}
                alt="cover image"
                fill={true}
              ></Image>
            </div>
          ) : null}
          <h1 className="mt-4 border-b-2 pb-4 text-4xl font-bold">{metadata.title}</h1>
          <div className="flex justify-between">
            <ul className="mt-1 mb-8 flex gap-3">
              {metadata.tags
                ? metadata.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        className="accent cursor-pointer hover:text-white"
                        href={`/blog?tag=${tag}`}
                      >
                        #{tag}
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
            <LikeButton storageKey={`liked-blog-post-${metadata.slug}`} />
          </div>
          <MdxRenderer source={mdxSerialized} />
        </div>
      </article>
      <footer className="py-32 text-center">
        <ScrollUpButton />
      </footer>
    </>
  );
}

type PathParams = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params: { slug } }: PathParams) {
  const post = getPostBySlug(slug);
  const mdxSerialized = await mdxSerialize(post.content);
  return { props: { metadata: post.metadata, mdxSerialized } };
}

export async function getStaticPaths() {
  const blogPosts = getAllPosts();

  const paths = blogPosts.map((post) => ({
    params: { slug: post.metadata.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
