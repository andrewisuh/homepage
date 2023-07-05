import { PostData } from '../util/types';
import Link from 'next/link';
import DateFormatter from './date-formatter';

type Props = {
  post: PostData;
};

const PostPreview = ({ post }: Props) => {
  return (
    <article className="my-4">
      <div className="flex-grow">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:highlight underline underline-offset-4 font-bold"
        >
          {post.title}
        </Link>
      </div>
      <div className="flex items-baseline gap-2 fg-muted text-sm">
        <DateFormatter
          className="fg-secondary text-sm"
          dateString={post.date}
          formatter="LLL dd"
        />
        {'•'}
        <ul className="flex gap-2">
          {post.tags
            ? post.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    className="no-underline cursor-pointer hover:accent"
                    href={`/blog?tag=${tag}`}
                  >
                    #{tag}
                  </Link>
                </li>
              ))
            : null}
        </ul>
      </div>
    </article>
  );
};

export default PostPreview;
