import { GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

const ProfileFeed = (props: {userId: string}) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({userId: props.userId});
  if (isLoading) return <LoadingPage/>
  if (!data || data.length === 0) return <div>User has not posted</div>

  return (
    <div className="flex flex-col">
      {data.map(fullPost => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  )
}

const ProfilePage: NextPage = () => {
  // const { slug } = useParams();
  const params = useRouter();
  const { slug } = params.query;
  if (typeof slug !== 'string') return <div>404</div>

  const { data, isLoading, error } = api.profile.getUserByUsername.useQuery({
    username: slug?.slice(1),
  })
  if (error) {
    return <div>{error.message}</div>
  }

  if (isLoading) {
    return <LoadingPage/>
  }
  if (!data) {
    return <div>404</div>
  }
  return (
    <>
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="bg-slate-600 h-36 relative">
          <Image 
            src={data.imageUrl} 
            alt={`${data.username ?? ''}'s profile pic`} 
            width={128}
            height={128}
            className="-mb-[64px] rounded-full border-4 border-black absolute bottom-0 left-0 ml-4"
          />
        </div>
        <div className="h-[64px]"></div>
        <div className="p-4 text-2xl font-bold">{`@${data.username ?? ''}`}</div>
        <div className="border-b w-full border-slate-400"></div>
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
}

// export async function getServerSideProps(context: {params: {slug: string}}) {
//   console.log(context.params)
//   return {
//     props: {
//       params: context.params,
//     }
//   }
// }
  
export default ProfilePage;