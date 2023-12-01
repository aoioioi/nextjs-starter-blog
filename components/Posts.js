import PostItem from './PostItem';

function Posts({ posts }) {
  return (
    <>
      {posts.map(post => (
        <PostItem
          key={post.slug}
          title={post.title}
          author={post.author}
          date={post.date}
          slug={post.slug}
          excerpt={post.excerpt}
          coverImage={post.coverImage}
        />
      ))}
    </>
  );
}

export default Posts;
