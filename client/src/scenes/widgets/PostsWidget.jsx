import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Fetched posts data with products:", data); // Debugging line
      if (Array.isArray(data)) {
        dispatch(setPosts({ posts: data }));
      } else {
        console.error("Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      console.log("Fetched user posts data with products:", data); // Debugging line
      if (Array.isArray(data)) {
        dispatch(setPosts({ posts: data }));
      } else {
        console.error("Fetched data is not an array");
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [userId, isProfile, token, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("Posts state:", posts); // Debugging line
  }, [posts]);

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            products,  // Add products here
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              products={products}  // Pass products to PostWidget
            />
          )
        )
      ) : (
        <div>No posts available</div>
      )}
    </>
  );
};

export default PostsWidget;
