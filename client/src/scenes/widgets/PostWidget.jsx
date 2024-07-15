import React, { useState, useEffect, useCallback } from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  products,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.text.primary;
  const primary = palette.primary.main;

  const fetchProductDetails = useCallback(async () => {
    const details = await Promise.all(
      products.map(async (productId) => {
        try {
          const response = await fetch(`http://localhost:3001/products/${productId._id}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch product ${productId}`);
          }
          const product = await response.json();
          return product;
        } catch (error) {
          console.error(`Error fetching product ${productId}:`, error);
          return null; // Return null if fetching fails
        }
      })
    );
    setProductDetails(details.filter((product) => product !== null)); // Filter out null values
  }, [products]);

  const patchLike = async () => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      if (!response.ok) {
        throw new Error("Failed to like the post");
      }
      fetchProductDetails(); 
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          src={`http://localhost:3001/assets/${picturePath}`}
          alt="post"
          style={{ width: "100%", borderRadius: "0.75rem", marginTop: "0.75rem" }}
        />
      )}
      {productDetails.length > 0 && (
        <Box mt="1rem">
          <Typography variant="h6" color={main} sx={{ textAlign: "center" }}>
            Tagged Products:
          </Typography>
          <Box sx={{ display: "flex", overflowX: "auto", maxWidth: "100%" }}>
            {productDetails.map((product) => (
              <Box key={product._id} mr="0.5rem" sx={{ minWidth: "200px" }}>
                {product.imagePath && (
                  <img
                    src={`http://localhost:3001/assets/${product.imagePath}`}
                    alt={product.name}
                    style={{ width: "100%", borderRadius: "0.75rem" }}
                  />
                )}
                <Typography variant="subtitle1" color={main} sx={{ textAlign: "center" }}>
                  {product.name}
                </Typography>
                <Typography variant="body2" color={main} sx={{ textAlign: "center" }}>
                  {product.description}
                </Typography>
                <Typography variant="body2" color={main} sx={{ textAlign: "center" }}>
                  ${product.price}
                </Typography>
                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <Typography variant="body2" color={primary} sx={{ textAlign: "center" }}>
                      View Product
                    </Typography>
                  </a>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <FlexBetween mt="1rem">
        <FlexBetween gap="1rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
          </IconButton>
          <Typography>{comments.length}</Typography>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, index) => (
            <Box key={`${postId}-comment-${index}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
