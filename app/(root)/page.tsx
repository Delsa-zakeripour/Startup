import StartupCard, { StartupTypeCard } from "../../components/StartupCard";
import SearchForm from "../../components/SearchForm";
// import { client } from "../../sanity/lib/client";
import { STARTUPS_QUERY } from "../../sanity/lib/queries";
import { sanityFetch, SanityLive } from "../../sanity/lib/live";
import { auth } from "../../auth";

// interface StartupCardType {
//   _: Date;
//   views: number;
//   author: {
//     _id: number;
//     name: "Adrian";
//   };
//   _id: number;
//   description: string;
//   image: string;
//   category: string;
//   title: string;
// }

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log("sessionnnn", session?.id);

  // const posts = await client.fetch(STARTUPS_QUERY);
  // console.log("posts", JSON.stringify(posts));

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  // const posts: StartupCardType[] = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: {
  //       _id: 1,
  //       name: "Adrian",
  //     },
  //     _id: 1,
  //     description: "This is a test description",
  //     image:
  //       "https://images.pexels.com/photos/8294562/pexels-photo-8294562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     category: "Robot",
  //     title: "we Robots",
  //   },
  // ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup , <br />
          Connect With Entrepreneurs
        </h1>
        <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words !max-w-3xl">
          Submit Ideas Vote On Piches, and Get Noticed in Virtual
          Competitions.{" "}
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startup Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
