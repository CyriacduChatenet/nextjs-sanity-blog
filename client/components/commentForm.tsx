import { ChangeEvent, FC, useState } from "react";

import sanity from "@/lib/sanity";

interface IProps {
  article_id: string;
}

const CommentForm: FC<IProps> = ({ article_id }) => {
  const [credentials, setCredentials] = useState<{ author: string; content: string }>({
    author: '',
    content: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = {
        _type: 'comment',
        author: credentials.author,
        content: credentials.content,
        article: {
          _type: 'reference',
          _ref: article_id,
        },
      };
      await sanity.create(comment);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input type="text" name="author" onChange={handleChange} placeholder="author" />
      <textarea
        name="content"
        cols={30}
        rows={10}
        placeholder="content"
        onChange={handleChange}
      ></textarea>
      <input type="submit" value="Send" />
    </form>
  );
};

export default CommentForm;
