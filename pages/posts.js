import { useState, useEffect } from 'react';
import Head from "next/head";
import Link from "next/link";
import { MainLayout } from "../components/MainLayout";

export default function Posts ({ posts: serverPosts }) {
  const [posts , setPosts] = useState(serverPosts);

  useEffect(() => {
    async function load() {
      const res = await fetch('http://localhost:4200/posts');
      const json = await res.json();

      setPosts(json);
    }

   if (!serverPosts) {
     console.log('serverPost', serverPosts)

     load();
   }
  }, []);

  if (!posts) {
    return (
      <MainLayout>
        <p>Loading ...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={'Posts Page'}>
      <Head>
        <title>Post Page | Next Course</title>
      </Head>
      <h1>Posts Page!</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/post/[id]`} as={`/post/${post.id}`}>
              <a>
                {post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </MainLayout>
  );
}

Posts.getInitialProps = async ({req}) => {
  if (!req) return { post: null };

  const res = await fetch('http://localhost:4200/posts')
  const json = await res.json()

  return { posts: json }
}
