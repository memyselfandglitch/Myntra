import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import ProductImage from "components/ProductImage"; // Assuming ProductImage component is in the same directory

const MyPostWidget = ({ picturePath, products }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]); // State to track selected products
  const { palette } = useTheme();
  const user = useSelector((state) => state.user); // Fetch user from Redux state
  const { _id, firstName, lastName } = user; // Destructure _id, firstName, lastName from user object
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  useEffect(() => {
    // Fetch additional data or setup initial state if needed
  }, []);

  const fullName = `${firstName} ${lastName}`; // Concatenate first and last name

  const handlePost = async () => {
    if (!post.trim()) {
      alert("Post cannot be empty");
      return;
    }
  
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("description", post);
    formData.append("products", JSON.stringify(selectedProducts)); // Convert selectedProducts to JSON string
    console.log("...", selectedProducts)
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }
    
    try {
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to post.");
      }
  
      const responseData = await response.json();
      console.log("Response Data:", responseData);
  
      if (responseData) {
        setImage(null);
        setPost("");
        setIsImage(false); // Reset image state after posting
        setSelectedProducts([]); // Reset selected products state after posting
        console.log("Post successful", responseData);
  
        // Re-fetch posts after successful post
        await getPosts();
      } else {
        console.error("Error: Response data does not contain posts");
        alert("Error: Response data does not contain posts");
      }
    } catch (error) {
      console.error("Error posting:", error);
      alert("Error posting: " + error.message);
    }
  };
  
  // Function to fetch posts
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
  
  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(product._id)
        ? prevSelectedProducts.filter((p) => p !== product._id)
        : [...prevSelectedProducts, product._id]
    );
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {isImage && (
        <Box border={`1px solid ${medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography>Add Image Here</Typography>
                  ) : (
                    <FlexBetween alignItems="center">
                      <Typography>{image.name}</Typography>
                      <IconButton onClick={() => setImage(null)}>
                        <DeleteOutlined />
                      </IconButton>
                    </FlexBetween>
                  )}
                </Box>
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

      </FlexBetween>

      {/* Display Products with selection option */}
      <Box mt="1rem">
        <Typography variant="h6" color={mediumMain}>
          Products
        </Typography>
        {products.map((product, index) => (
          <Box key={index} display="flex" alignItems="center" mt="1rem">
            <Checkbox
              checked={selectedProducts.includes(product._id)}
              onChange={() => handleProductSelect(product)}
            />
            <ProductImage image={product.imagePath} size="140px" />
            <Box ml="1rem">
              <Typography variant="subtitle1">{product.name}</Typography>
              <Typography variant="body2">{product.description}</Typography>
              <Typography variant="body2">${product.price}</Typography>
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                <Typography variant="body2" color={palette.primary.main}>
                  View Product
                </Typography>
              </a>
            </Box>
          </Box>
        ))}
      </Box>

      {/* POST button below Products list */}
      <Box mt="2rem">
        <Button
          disabled={!post}
          onClick={() => {
            console.log("Post button clicked");
            handlePost();
          }}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </Box>

      <Divider sx={{ margin: "1.25rem 0" }} />

    </WidgetWrapper>
  );
};

export default MyPostWidget;
