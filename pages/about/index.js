import Router from 'next/router';
import { MainLayout } from "../../components/MainLayout";

export default function About ({ title }) {

  return (
    <MainLayout title={'About Page'}>
      <h1>{title}</h1>

      <button onClick={() => Router.push('/posts')}>Go to Posts</button>
    </MainLayout>
  );
}

About.getInitialProps = async () => {
  const res = await fetch('http://localhost:4200/about');
  const data = await res.json();

  return {
    title: data.title
  }
}
