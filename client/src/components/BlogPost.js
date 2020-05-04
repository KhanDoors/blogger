import React from "react";

const BlogPost = (props) => {
  console.log(props);
  return <div>{JSON.stringify(props)}</div>;
};

export default BlogPost;
