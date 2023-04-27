import sanity from "@/lib/sanity";
import { sanityUrlFor } from "@/lib/sanity-image";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  article: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    thumbnail: {
      asset: {
        _ref: string;
      };
    };
    content: string;
  };
}

const Article: NextPage<IProps> = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <br />
      <br />
      <Link href={"/"}>go to home</Link>
      <br />
      <br />
      <Image src={sanityUrlFor(article.thumbnail.asset._ref).url()} alt={""} width={200} height={200} />
      <p>{article.content}</p>
    </div>
  );
};

export default Article;

const articlesQuery = `*[_type == "article"] { slug { current } }`;

const singleArticleQuery = `*[_type == "article" && slug.current == $slug] {
  _id,
  title,
  slug,
  thumbnail,
  content,
}[0]
`;


export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const articles = await sanity.fetch(articlesQuery);
  const paths = articles.map((article: { slug: { current: any; }; }) => ({
    params: { slug: article.slug.current }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }: any) => {
  const article = await sanity.fetch(singleArticleQuery, { slug: params.slug });
  return { props: { article } };
};
