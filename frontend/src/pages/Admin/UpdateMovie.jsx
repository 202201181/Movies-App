
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   useGetSpecificMovieQuery,
//   useUpdateMovieMutation,
//   useUploadImageMutation,
//   useDeleteMovieMutation,
// } from "../../redux/api/movies";
// import { toast } from "react-toastify";
// import Sidebar from "./Dashboard/Sidebar/Sidebar";

// const UpdateMovie = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: 0,
//     detail: "",
//     cast: [],
//     ratings: 0,
//     image: null,
//   });

//   const [selectedImage, setSelectedImage] = useState(null);
//   const { data: initialMovieData } = useGetSpecificMovieQuery(id);

//   useEffect(() => {
//     if (initialMovieData) {
//       setMovieData(initialMovieData);
//     }
//   }, [initialMovieData]);

//   const [updateMovie, { isLoading: isUpdatingMovie }] =
//     useUpdateMovieMutation();

//   const [
//     uploadImage,
//     { isLoading: isUploadingImage, error: uploadImageErrorDetails },
//   ] = useUploadImageMutation();

//   const [deleteMovie] = useDeleteMovieMutation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMovieData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const [isUpdating, setIsUpdating] = useState(false);
//   const handleUpdateMovie = async () => {
//     try {
//       setIsUpdating(true);
//       if (
//         !movieData.name ||
//         !movieData.year ||
//         !movieData.detail ||
//         !movieData.cast
//       ) {
//         toast.error("Please fill in all required fields");
//         setIsUpdating(false);

//         return;
//       }

//       let uploadedImagePath = movieData.image;

//       if (selectedImage) {
//         const formData = new FormData();
//         formData.append("file", selectedImage);
//         formData.append("upload_preset", "qs1elcf4");
//         formData.append("cloud_name", "dtsxh7w4m");

//         console.log("selectedImage", selectedImage);

//         const cloudinaryResponse = await fetch(
//           "https://api.cloudinary.com/v1_1/dtsxh7w4m/image/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         console.log("cloudinaryResponse", cloudinaryResponse);

//         if (!cloudinaryResponse.ok) {
//           throw new Error("Failed to upload image to Cloudinary");
//         }

//         if (cloudinaryResponse.ok) {
//           const cloudinaryData = await cloudinaryResponse.json();
//           console.log("Cloudinary response data:", cloudinaryData); // Log the full response to debug

//           if (cloudinaryData.secure_url) {
//             uploadedImagePath = cloudinaryData.secure_url;
//           } else {
//             console.error("No secure_url found in Cloudinary response");
//             toast.error("Failed to upload image: No secure_url found");
//             return;
//           }
//         } else {
//           console.error(
//             "Cloudinary upload error:",
//             await cloudinaryResponse.text()
//           );
//           toast.error("Failed to upload image to Cloudinary");
//           setIsUpdating(false);

//           return;
//         }
//       }

//       await updateMovie({
//         id: id,
//         updatedMovie: {
//           ...movieData,
//           image: uploadedImagePath,
//         },
//       });
//       toast.success("Movie updated successfully");
//       window.location.href = "/movies";
//     } catch (error) {
//       console.error("Failed to update movie:", error);
//       setIsUpdating(false);
//     }
//   };

//   const handleDeleteMovie = async () => {
//     try {
//       toast.success("Movie deleted successfully");
//       await deleteMovie(id);
//       navigate("/movies");
//     } catch (error) {
//       console.error("Failed to delete movie:", error);
//       toast.error(`Failed to delete movie: ${error?.message}`);
//     }
//   };

//   return (
//     <>
      
//       <div className="container flex justify-center items-center mt-4">
//         <form>
//           <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>

//           <div className="mb-4">
//             <label className="block">
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={movieData.name}
//                 onChange={handleChange}
//                 className="border px-2 py-1 w-full"
//               />
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block">
//               Year:
//               <input
//                 type="number"
//                 name="year"
//                 value={movieData.year}
//                 onChange={handleChange}
//                 className="border px-2 py-1 w-full"
//               />
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block">
//               Detail:
//               <textarea
//                 name="detail"
//                 value={movieData.detail}
//                 onChange={handleChange}
//                 className="border px-2 py-1 w-full"
//               />
//             </label>
//           </div>
//           <div className="mb-4">
//             <label className="block">
//               Cast (comma-separated):
//               <input
//                 type="text"
//                 name="cast"
//                 value={movieData.cast.join(", ")}
//                 onChange={(e) =>
//                   setMovieData({
//                     ...movieData,
//                     cast: e.target.value.split(", "),
//                   })
//                 }
//                 className="border px-2 py-1 w-full"
//               />
//             </label>
//           </div>

//           <div className="mb-4">
//             <label
//               style={
//                 !selectedImage
//                   ? {
//                       border: "1px solid #888",
//                       borderRadius: "5px",
//                       padding: "8px",
//                     }
//                   : {
//                       border: "0",
//                       borderRadius: "0",
//                       padding: "0",
//                     }
//               }
//             >
//               {!selectedImage && "Upload Image"}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 style={{ display: !selectedImage ? "none" : "block" }}
//               />
//             </label>
//           </div>

//           <button
//             type="button"
//             onClick={handleUpdateMovie}
//             className="bg-teal-500 text-white px-4 py-2 rounded"
//             disabled={isUpdatingMovie || isUploadingImage}
//           >
//             {isUpdatingMovie || isUploadingImage
//               ? "Updating..."
//               : "Update Movie"}
//           </button>

//           <button
//             type="button"
//             onClick={handleDeleteMovie}
//             className="bg-red-500 text-white px-4 py-2 rounded ml-2"
//             disabled={isUpdatingMovie || isUploadingImage}
//           >
//             {isUpdatingMovie || isUploadingImage
//               ? "Deleting..."
//               : "Delete Movie"}
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };
// export default UpdateMovie;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetSpecificMovieQuery,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { Star } from "lucide-react";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    video: null,
    genre: "",
    tier: "silver",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  const { data: initialMovieData } = useGetSpecificMovieQuery(id);
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();
  const [updateMovie, { isLoading: isUpdatingMovie }] =
    useUpdateMovieMutation();
  const [deleteMovie] = useDeleteMovieMutation();

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      const yearValue = parseInt(value) || "";
      setMovieData((prev) => ({ ...prev, [name]: yearValue }));
    } else {
      setMovieData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => setSelectedImage(e.target.files[0]);
  const handleVideoChange = (e) => setSelectedVideo(e.target.files[0]);

  const handleUpdateMovie = async () => {
    try {
      setIsUpdating(true);
      if (
        !movieData.name.trim() ||
        !movieData.year ||
        !movieData.detail.trim() ||
        !movieData.genre ||
        !movieData.cast
      ) {
        toast.error("Please fill in all required fields");
        setIsUpdating(false);
        return;
      }

      const castArray = Array.isArray(movieData.cast)
        ? movieData.cast
        : movieData.cast
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);

      if (castArray.length === 0) {
        toast.error("Please add at least one cast member");
        return;
      }

      let uploadedImagePath = movieData.image;
      let uploadedVideoPath = movieData.video;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("file", selectedImage);
        formData.append("upload_preset", "qs1elcf4");
        formData.append("cloud_name", "dtsxh7w4m");

        const imageResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dtsxh7w4m/image/upload",
          { method: "POST", body: formData }
        );

        if (!imageResponse.ok) throw new Error("Failed to upload image");
        const imageData = await imageResponse.json();
        uploadedImagePath = imageData.secure_url;
      }

      if (selectedVideo) {
        const formData = new FormData();
        formData.append("file", selectedVideo);
        formData.append("upload_preset", "qs1elcf4");
        formData.append("cloud_name", "dtsxh7w4m");

        const videoResponse = await fetch(
          "https://api.cloudinary.com/v1_1/dtsxh7w4m/video/upload",
          { method: "POST", body: formData }
        );

        if (!videoResponse.ok) throw new Error("Failed to upload video");
        const videoData = await videoResponse.json();
        uploadedVideoPath = videoData.secure_url;
      }

      await updateMovie({
        id,
        updatedMovie: {
          ...movieData,
          detail: movieData.detail.trim(),
          cast: castArray,
          image: uploadedImagePath,
          video: uploadedVideoPath,
        },
      });

      toast.success("Movie updated successfully");
       window.location.href = "/admin/movies-list";
      
    } catch (error) {
      console.error("Failed to update movie:", error);
      toast.error(error.message || "Failed to update movie");
      setIsUpdating(false);
    }
  };

  const handleDeleteMovie = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await deleteMovie(id);
        toast.success("Movie deleted successfully");
         window.location.href = "/admin/movies-list";
      } catch (error) {
        toast.error(error.message || "Failed to delete movie");
      }
    }
  };

  return (
    <div className="min-h-screen  bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto bg-gray-900 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700">
          Update Movie
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Movie Name
              </label>
              <input
                type="text"
                name="name"
                value={movieData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Enter movie name"
              />
            </div>

            {/* Year Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Release Year
              </label>
              <input
                type="number"
                name="year"
                value={movieData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            {/* Genre Select */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Genre
              </label>
              <select
                name="genre"
                value={movieData.genre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              >
                {isLoadingGenres ? (
                  <option>Loading genres...</option>
                ) : (
                  genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Cast Input */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Cast Members
              </label>
              <input
                type="text"
                name="cast"
                value={
                  Array.isArray(movieData.cast)
                    ? movieData.cast.join(", ")
                    : movieData.cast
                }
                onChange={(e) =>
                  setMovieData((prev) => ({
                    ...prev,
                    cast: e.target.value.split(",").map((item) => item.trim()),
                  }))
                }
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                placeholder="Enter cast names (comma-separated)"
              />
            </div>

            {/* Rating Stars */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer transition-colors ${
                      star <= (hoveredRating || movieData.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() =>
                      setMovieData((prev) => ({ ...prev, rating: star }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Movie Details */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Movie Details
              </label>
              <textarea
                name="detail"
                value={movieData.detail}
                onChange={(e) =>
                  setMovieData((prev) => ({
                    ...prev,
                    detail: e.target.value,
                  }))
                }
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                placeholder="Enter movie description"
              />
            </div>

            {/* Tier Select */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Tier
              </label>
              <select
                name="tier"
                value={movieData.tier}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
              >
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
                <option value="platinum">Platinum</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Update Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
              {movieData.image && !selectedImage && (
                <p className="mt-2 text-sm text-gray-400">
                  {/* Current image: {movieData.image.split("/").pop()} */}
                </p>
              )}
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Update Video
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
              />
              {movieData.video && !selectedVideo && (
                <p className="mt-2 text-sm text-gray-400">
                  {/* Current video: {movieData.video.split("/").pop()} */}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex space-x-4">
          <button
            type="button"
            onClick={handleUpdateMovie}
            disabled={isUpdatingMovie}
            className="flex-1 bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUpdatingMovie ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Movie"
            )}
          </button>
          <button
            type="button"
            onClick={handleDeleteMovie}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
          >
            Delete Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateMovie;