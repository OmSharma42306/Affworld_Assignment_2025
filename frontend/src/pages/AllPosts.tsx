import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const getAllPostsUrl = import.meta.env.VITE_POSTS_URL;

// Creating POST Type Interface for Post related tasks

interface Post {
    _id: string;
    imageUrl: string;
    caption: string;
    googleUserId?:string;
    userId:{
        _id : string;
        name : string;
    };
    createdAt: string;
}

export default function AllPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    

    useEffect(() => {
        getAllPosts();
    }, []);

    async function getAllPosts() {
        const token = localStorage.getItem("token")
        const response = await axios.get(`${getAllPostsUrl}/getAllPost`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log("URL: ", getAllPostsUrl);
        const data = await response.data;
        console.log("Posts Response", data);
        setPosts(data.posts);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header with Create Post button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Feed</h1>
                    <div className="flex space-x-4">
                        <Link 
                            to="/post"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Create Post
                        </Link>
                        <Link 
                            to="/dashboard"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Back
                        </Link>
                    </div>
                </div>

                {/* Posts Grid */}
                <div className="space-y-8">
                    {posts.map((post) => (
                        <div 
                            key={post._id}
                            className="bg-white rounded-xl shadow-md overflow-hidden"
                        >
                            {/* Image container with fixed aspect ratio */}
                            <div className="relative h-96">
                                <img
                                    src={post.imageUrl}
                                    alt="Post image"
                                    className="absolute w-full h-full object-cover"
                                />
                            </div>

                            {/* Content section */}
                            <div className="p-6">
                                <p className="text-xl font-semibold text-gray-800 mb-4">
                                    {post.caption}
                                </p>
                                
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <span className="font-medium">Posted by:</span>
                                        <span className="ml-2">{post.googleUserId ? post.googleUserId : post.userId?.name}</span>
                                    </div>
                                    <time className="text-gray-500">
                                        {new Date(post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}