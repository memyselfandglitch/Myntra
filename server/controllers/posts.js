import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, products } = req.body;

    // Fetch user details from User model
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new post object
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
      products: JSON.parse(products), // Parse products array from JSON string
    });

    // Save the new post
    await newPost.save();

    // Fetch all posts after creating a new post
    const posts = await Post.find().populate("products");
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export const getFeedPosts = async (req, res) => {
  try {
    // Fetch all posts with populated products
    const posts = await Post.find().sort({ createdAt: -1 }).populate("products");
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch posts for a specific user with populated products
    const posts = await Post.find({ userId }).sort({ createdAt: -1 }).populate("products");
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Toggle like status for the user
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    // Update and return the updated post
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
