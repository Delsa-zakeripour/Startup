import React, { Suspense } from "react";
import { client } from "../../../../sanity/lib/client";
import {
  STARTUPS_BY_ID_QUERY,
  PLAYLIST_BY_SLUG_QUERY,
} from "../../../../sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "../../../../lib/utils";
import Link from "next/link";
import markdownit from "markdown-it";
import { Skeleton } from "../../../../components/ui/skeleton";
import View from "../../../../components/View";
import Image from "next/image";
import StartupCard, {
  StartupTypeCard,
} from "../../../../components/StartupCard";

export const experimental_ppr = true;

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  // const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  // const { select: editorPosts } = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {
  //   slug: "editor-picks",
  // });

  // insdet of call in sequential, use parallel (call 2 with promise.all) to load data faster ==>

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUPS_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks",
    }),
  ]);

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex items-center gap-2 mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <p className="category-tag">{post.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all text-gray-600 mb-6"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">no details provided!</p>
          )}
        </div>

        <hr className="divider" />

        {/* {to do : editor selected startups} */}

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={post._id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
