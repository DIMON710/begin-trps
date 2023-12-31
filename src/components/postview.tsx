import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { RouterOutputs } from '~/utils/api';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
    const { post, author } = props;
    return (
      <div className="flex gap-3 border-b border-slate-400 p-4">
        <Link href={`/@${author.username}`} className="shrink-0"><Image
          src={author.imageUrl}
          alt="User-photo"
          width={56}
          height={56}
          className="h-14 w-14 rounded-full"
        /></Link>
        <div className="flex flex-col">
          <div className="flex gap-1 text-slate-300">
            <Link href={`/@${author.username}`}><span>{`@${author.username}`}</span></Link>
            <Link href={`/post/${post.id}`}>
              <span className="font-thin">{` · ${dayjs(
                post.createdAt,
              ).fromNow()}`}</span>
            </Link>
          </div>
          <span className="text-2xl">{post.content}</span>
        </div>
      </div>
    );
  };
