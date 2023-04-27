import CommentForm from "@/components/commentForm";
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
    categories: [
      {
        _id: string;
        name: string;
      }
    ]
    content: string;
  };
}

const Article: NextPage<IProps> = ({ article }) => {
  return (
    <div>
      <h1>{article.title}</h1>
      <br />
      <br />
      <div>
        {article.categories.map((category: { _id: string; name: string; }) => (
          <span key={category._id}>{category.name} &nbsp;</span>
        ))}
      </div>
      <Link href={"/"}>go to home</Link>
      <br />
      <br />
      <Image src={sanityUrlFor(article.thumbnail.asset._ref).url()} alt={""} width={200} height={200} />
      <p>{article.content}</p>
      <div>
        <br />
        <h2>Comments</h2>
        <br />
       {article.comments.map((comment: { _id: string; author: string; content: string; }) => (
          <div key={comment._id}>
            <h3>{comment.author}</h3>
            <p>{comment.content}</p>
          </div>
        ))}
        <br />
        <CommentForm article_id={article._id}/>
      </div>
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
  "categories": categories[]->{
    _id,
    name
  },
  "comments": *[_type == "comment" && references(^._id)] {
    _id,
    author,
    content,
  }
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
