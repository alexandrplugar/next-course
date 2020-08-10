import { useState, useEffect } from 'react';
import Link from "next/link";
import { MainLayout } from "../../components/MainLayout";
import {useRouter} from "next/router";

export default function Post({ post: serverPost }) {
  const [post, setPost] = useState(serverPost);
  const router = useRouter();

  useEffect(() => {
    async function load() {
      const res = await fetch(`http://localhost:4200/posts/${router.query.id}`)
      const data = await res.json()

      setPost(data);
    }

    if (!serverPost) {
      console.log('serverPost', serverPost)

      load();
    }
  }, []);

  if (!post) {
    return (
      <MainLayout>
        <p>Loading ...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1>{post.title}</h1>
      <hr />
      <p>{post.body}</p>
      <Link href={'/posts'}><a>Back to all posts</a></Link>
    </MainLayout>
  );
}

// export async function getServerSideProps({ req, query }) {
//   const res = await fetch(`http://localhost:4200/posts/${query.id}`)
//   const json = await res.json()
//
//   return { props: {post: json} }
// }

Post.getInitialProps = async ({ query, req }) => {
  if (!req) return { post: null };

  const res = await fetch(`http://localhost:4200/posts/${query.id}`)
  const json = await res.json()

  return { post: json }
}
