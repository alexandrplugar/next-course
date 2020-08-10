import Link from "next/link";
import { MainLayout } from "../components/MainLayout";

export default function Index () {
  return (
    <MainLayout title={'Home Page'}>
      <h1>Hello Next.js</h1>
      <Link href={'/about'}><a>About</a></Link>
      <br/>
      <Link href={'/posts'}><a>Posts</a></Link>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum illo suscipit tempore.</p>
    </MainLayout>
  );
}
