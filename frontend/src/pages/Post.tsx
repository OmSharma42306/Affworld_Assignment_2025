import {  useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import { Link } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_POSTS_URL 
const Post  = () => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const token = localStorage.getItem("token")  
    // Helper function to decode the token and extract userId
    const getUserIdFromToken = () => {
      if (!token) return null;
      try {
        const decoded: any = jwtDecode(token); // Decode the JWT
        console.log("Decoded Google Token",decoded)
        return decoded;
        //return decoded.name; // Adjust based on the backend token structure
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };
  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    setPhoto(file);
    // Create preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleCaptionChange = (e:any) => {
    setCaption(e.target.value);
  };

 

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!photo || !caption) {
      setMessage("Please provide both a photo and a caption.");
      return;
    }

    const decoded = getUserIdFromToken();
  
    if(!decoded.user){
      setMessage("unable to determine user!. Please Login Again!")
    }

    // sending googleAuth Users Posts.
    if(decoded.name){
      const googleUserId = decoded.name;
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("caption", caption);
      formData.append("googleUserId", googleUserId); // issue
      try {
        setLoading(true);
        setMessage("");
        const response = await axios.post(
          `${BACKEND_URL}/createPost`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization : `Bearer ${token}`
            },
          }
        );
  
        setMessage("Post uploaded successfully!");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error uploading post:", error);
        setMessage("Error uploading post. Please try again.");
      } finally {
        setLoading(false);
        setPhoto(null);
        setCaption("");
        setPreviewUrl("");
      }
      }

      // sending JWT Auth Users Posts.
      if(decoded.userId){
        const userId = decoded.userId;
        const formData = new FormData();
      formData.append("photo", photo);
      formData.append("caption", caption);
      formData.append("userId", userId);// issue
      try {
        setLoading(true);
        setMessage("");
        const response = await axios.post(
          `${BACKEND_URL}/createPost`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization : `Bearer ${token}`
            },
          }
        );
  
        setMessage("Post uploaded successfully!");
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error uploading post:", error);
        setMessage("Error uploading post. Please try again.");
      } finally {
        setLoading(false);
        setPhoto(null);
        setCaption("");
        setPreviewUrl("");
      }
  
      }
      
      }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Create New Post
          </h2>
          <Link
              to="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors"
            >
              Back
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload Section */}
            <div>
              <label 
                htmlFor="photo" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="mb-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-48 w-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="photo"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Caption Section */}
            <div>
              <label 
                htmlFor="caption" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Caption
              </label>
              <textarea
                id="caption"
                value={caption}
                onChange={handleCaptionChange}
                rows={4}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                placeholder="Write a caption for your post..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${loading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </span>
              ) : (
                'Upload Post'
              )}
            </button>
          </form>

          {/* Status Message */}
          {message && (
            <div className={`mt-4 p-4 rounded-md ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700' 
                : 'bg-green-50 text-green-700'
            }`}>
              <p className="text-sm font-medium">{message}</p>
              
            </div>
          )}
       
        </div>
      </div>
    </div>
  );
};

export default Post;