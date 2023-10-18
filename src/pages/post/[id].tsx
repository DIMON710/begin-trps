import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

const SinglePostPage: NextPage = () => {
  // const { slug } = useParams();
  const params = useRouter();
  const { id } = params.query;
  if (typeof id !== 'string') return <div>404</div>

  const { data, isLoading, error } = api.posts.getById.useQuery({
    id,
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
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
}
  
export default SinglePostPage;