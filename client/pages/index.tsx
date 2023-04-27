import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import sanity from '@/lib/sanity'
import { NextPage } from 'next'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

interface IProps {
  articles: any[];
  categories: any[];
};

const Home: NextPage<IProps> = ({ articles, categories }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <div>
          <Image
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
          <div>
            <Image
              src="/thirteen.svg"
              alt="13"
              width={40}
              height={31}
              priority
            />
          </div>
        </div>

        <h2>Articles</h2>
        <div>
          {articles.map((article, index) => <Link href={`article/${article.slug.current}`} key={index}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
          </Link>)}
        </div>

        <h2>Categories</h2>
        <div>
          {categories.map((category, index) => <Link href={`category/${category.slug.current}`} key={index}>
            <h3>{category.name}</h3>
          </Link>)}
        </div>
      </main>
    </>
  )
}

export default Home;

const articleQuery = `*[_type == "article"] {
  _id,
  title,
  slug,
  content,
  "categories": categories[]->{
    _id,
    name
  }
}`;

const categoryQuery = `*[_type == "category"] {
  _id,
  name,
  slug,
  "articles": articles[]->{
    _id,
    title,
  }
}`;

export const getStaticProps = async () => {
  const articles = await sanity.fetch(articleQuery);
  const categories = await sanity.fetch(categoryQuery);
  return {
    props: { articles, categories }
  };
};