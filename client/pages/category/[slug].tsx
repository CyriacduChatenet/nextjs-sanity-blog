import sanity from "@/lib/sanity";
import { NextPage } from "next";
import Link from "next/link";

interface IProps {
    category: {
        _id: string;
        name: string;
        slug: {
          current: string;
        };
        articles: [
          {
            _id: string;
            title: string;
          }
        ]
      };
}

const CategoryPage: NextPage<IProps> = ({ category }) => {
    return (
        <div>
             <h1>{category.name}</h1>
      <br />
      <br />
      <Link href={"/"}>go to home</Link>
        </div>
    );
};

export default CategoryPage;

const categoriesQuery = `*[_type == "category"] { slug { current } }`;

const singleCategoryQuery = `*[_type == "category" && slug.current == $slug] {
  _id,
  name,
  slug,
  thumbnail,
  content,
  "articles": articles[]->{
    _id,
    title
  }
}[0]
`;


export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on persons
  const categories = await sanity.fetch(categoriesQuery);
  const paths = categories.map((category: { slug: { current: any; }; }) => ({
    params: { slug: category.slug.current }
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }: any) => {
  const category= await sanity.fetch(singleCategoryQuery, { slug: params.slug });
  return { props: { category } };
};