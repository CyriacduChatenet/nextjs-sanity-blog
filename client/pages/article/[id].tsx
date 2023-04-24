import sanity from "@/lib/sanity";
import { NextPage } from "next";
import Link from "next/link";

interface IProps {
    article: {
        _id: string;
        name: string;
        content: string;
    }
}

const Article: NextPage<IProps> = ({ article}) => {
    return (
        <div>
            <h1>{article.name}</h1>
            <br />
            <br />
            <Link href={'/'}>go to home</Link>
            <br />
            <br />
            <p>{article.content}</p>
        </div>
    );
};

export default Article;

const articlesQuery = `*[_type == "article"] { _id }`;

const singleArticleQuery = `*[_type == "article" && _id == $id] {
  _id,
  name,
  content,
}[0]
`;

export const getStaticPaths = async () => {
    // Get the paths we want to pre-render based on persons
    const articles = await sanity.fetch(articlesQuery);
    const paths = articles.map((article: { _id: any; }) => ({
      params: { id: article._id }
    }));
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false };
  };
  
  // This function gets called at build time on server-side.
  export const getStaticProps = async ({ params }: any) => {
    const article = await sanity.fetch(singleArticleQuery, { id: params.id });
    return { props: { article } };
  };