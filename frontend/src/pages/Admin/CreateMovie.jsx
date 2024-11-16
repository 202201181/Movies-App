// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCreateMovieMutation } from "../../redux/api/movies";
// import { useFetchGenresQuery } from "../../redux/api/genre";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Star } from "lucide-react";
// import Sidebar from "./Dashboard/Sidebar/Sidebar";

// const CreateMovie = () => {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: "",
//     detail: "",
//     cast: [],
//     rating: 0,
//     image: null,
//     video: null,
//     genre: "",
//     tier: "silver",
//   });

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const [
//     createMovie,
//     { isLoading: isCreatingMovie, error: createMovieErrorDetail },
//   ] = useCreateMovieMutation();

//   const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

//   useEffect(() => {
//     if (genres?.length > 0) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: genres[0]?._id || "",
//       }));
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "year") {
//       const yearValue = parseInt(value) || "";
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: yearValue,
//       }));
//     } else {
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedImage(file);
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedVideo(file);
//   };

//   const handleCreateMovie = async () => {
//     try {
//       if (
//         !movieData.name.trim() ||
//         !movieData.year ||
//         !movieData.detail.trim() ||
//         !movieData.genre ||
//         !selectedImage ||
//         !selectedVideo
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       const castArray = Array.isArray(movieData.cast)
//         ? movieData.cast
//         : movieData.cast
//             .split(",")
//             .map((item) => item.trim())
//             .filter(Boolean);

//       if (castArray.length === 0) {
//         toast.error("Please add at least one cast member");
//         return;
//       }

//       const uploadImage = async () => {
//         const formData = new FormData();
//         formData.append("file", selectedImage);
//         formData.append("upload_preset", "qs1elcf4");
//         formData.append("cloud_name", "dtsxh7w4m");

//         const response = await fetch(
//           "https://api.cloudinary.com/v1_1/dtsxh7w4m/image/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to upload image");
//         }

//         const data = await response.json();
//         return data.secure_url;
//       };

//       const uploadVideo = async () => {
//         const formData = new FormData();
//         formData.append("file", selectedVideo);
//         formData.append("upload_preset", "qs1elcf4");
//         formData.append("cloud_name", "dtsxh7w4m");

//         const response = await fetch(
//           "https://api.cloudinary.com/v1_1/dtsxh7w4m/video/upload",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to upload video");
//         }

//         const data = await response.json();
//         return data.secure_url;
//       };

//       const [uploadedImagePath, uploadedVideoPath] = await Promise.all([
//         uploadImage(),
//         uploadVideo(),
//       ]);

//       const moviePayload = {
//         name: movieData.name.trim(),
//         year: parseInt(movieData.year),
//         detail: movieData.detail.trim(),
//         cast: castArray,
//         rating: movieData.rating,
//         image: uploadedImagePath,
//         video: uploadedVideoPath,
//         genre: movieData.genre,
//         tier: movieData.tier, // Added tier to payload
//       };

//       const result = await createMovie(moviePayload).unwrap();

//       if (result) {
//         toast.success("Movie Added Successfully");
//          window.location.href = "/admin/movies-list";

//       }
//     } catch (error) {
//       console.error("Error creating movie:", error);
//       toast.error(error.message || "Failed to create movie");
//     }
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         style={{
//           zIndex: 1000000000000000000,
//         }}
//       />
//       <div className="flex h-screen   bg-gray overflow-hidden">
//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto px-8 py-6">
//             <div className="bg-gray-900 rounded-xl shadow-xl p-8">
//               <div className="max-w-6xl mx-auto">
//                 <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700 mt-2">
//                   Create Movie
//                 </h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Name:
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={movieData.name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                         placeholder="Enter movie name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Year:
//                       </label>
//                       <input
//                         type="number"
//                         name="year"
//                         value={movieData.year}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                         placeholder="Enter release year"
//                         min="1900"
//                         max={new Date().getFullYear()}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Genre:
//                       </label>
//                       <select
//                         name="genre"
//                         value={movieData.genre}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                       >
//                         {isLoadingGenres ? (
//                           <option>Loading genres...</option>
//                         ) : (
//                           genres?.map((genre) => (
//                             <option key={genre._id} value={genre._id}>
//                               {genre.name}
//                             </option>
//                           ))
//                         )}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Cast (comma-separated):
//                       </label>
//                       <input
//                         type="text"
//                         name="cast"
//                         value={
//                           Array.isArray(movieData.cast)
//                             ? movieData.cast.join(",")
//                             : movieData.cast
//                         }
//                         onChange={(e) =>
//                           setMovieData({
//                             ...movieData,
//                             cast: e.target.value
//                               .split(",")
//                               .map((item) => item.trim()),
//                           })
//                         }
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                         placeholder="Enter cast names"
//                       />
//                     </div>

//                     {/* Added Rating Stars */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Rating:
//                       </label>
//                       <div className="flex space-x-1">
//                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
//                           <Star
//                             key={star}
//                             size={24}
//                             className={`cursor-pointer transition-colors ${
//                               star <= (hoveredRating || movieData.rating)
//                                 ? "text-yellow-400 fill-yellow-400"
//                                 : "text-gray-400"
//                             }`}
//                             onMouseEnter={() => setHoveredRating(star)}
//                             onMouseLeave={() => setHoveredRating(0)}
//                             onClick={() =>
//                               setMovieData((prev) => ({
//                                 ...prev,
//                                 rating: star,
//                               }))
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     {/* Added Tier Selection */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Tier:
//                       </label>
//                       <select
//                         name="tier"
//                         value={movieData.tier}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                       >
//                         <option value="silver">Silver</option>
//                         <option value="gold">Gold</option>
//                         <option value="platinum">Platinum</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Detail:
//                       </label>
//                       <textarea
//                         name="detail"
//                         value={movieData.detail}
//                         onChange={handleChange}
//                         rows="4"
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
//                         placeholder="Enter movie details"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Upload Image:
//                       </label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Upload Video:
//                       </label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <button
//                     type="button"
//                     onClick={handleCreateMovie}
//                     disabled={isCreatingMovie}
//                     className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isCreatingMovie ? (
//                       <span className="flex items-center justify-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Creating...
//                       </span>
//                     ) : (
//                       "Create Movie"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateMovie;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCreateMovieMutation } from "../../redux/api/movies";
// import { useFetchGenresQuery } from "../../redux/api/genre";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Star } from "lucide-react";

// const CreateMovie = () => {
//   const navigate = useNavigate();

//   const [movieData, setMovieData] = useState({
//     name: "",
//     year: "",
//     detail: "",
//     cast: [],
//     rating: 0,
//     genre: "",
//     tier: ["silver"],
//   });

//   const [selectedImage, setSelectedImage] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [hoveredRating, setHoveredRating] = useState(0);

//   const [createMovie, { isLoading: isCreatingMovie }] =
//     useCreateMovieMutation();
//   const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

//   useEffect(() => {
//     if (genres?.length > 0) {
//       setMovieData((prevData) => ({
//         ...prevData,
//         genre: genres[0]?._id || "",
//       }));
//     }
//   }, [genres]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "year") {
//       const yearValue = parseInt(value) || "";
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: yearValue,
//       }));
//     } else if (name === "tier") {
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: [value],
//       }));
//     } else {
//       setMovieData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("Image file size should be less than 10MB");
//         return;
//       }
//       setSelectedImage(file);
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 100 * 1024 * 1024) {
//         toast.error("Video file size should be less than 100MB");
//         return;
//       }
//       setSelectedVideo(file);
//     }
//   };

//   const handleCreateMovie = async () => {
//     try {
//       if (
//         !movieData.name.trim() ||
//         !movieData.year ||
//         !movieData.detail.trim() ||
//         !movieData.genre ||
//         !selectedImage ||
//         !selectedVideo ||
//         movieData.rating === 0
//       ) {
//         toast.error("Please fill all required fields");
//         return;
//       }

//       const castArray = Array.isArray(movieData.cast)
//         ? movieData.cast
//         : movieData.cast
//             .split(",")
//             .map((item) => item.trim())
//             .filter(Boolean);

//       if (castArray.length === 0) {
//         toast.error("Please add at least one cast member");
//         return;
//       }

//       const formData = new FormData();
//       formData.append("name", movieData.name.trim());
//       formData.append("year", movieData.year);
//       formData.append("detail", movieData.detail.trim());
//       formData.append("genre", movieData.genre);
//       formData.append("rating", movieData.rating.toString());
//       formData.append("image", selectedImage);
//       formData.append("video", selectedVideo);
//       movieData.tier.forEach((t) => formData.append("tier", t));
//       castArray.forEach((cast) => formData.append("cast", cast));

//       const response = await fetch("/api/v1/create-movie", {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create movie");
//       }

//       const result = await response.json();
//       toast.success("Movie Added Successfully");
//       navigate("/admin/movies-list");
//     } catch (error) {
//       console.error("Error creating movie:", error);
//       toast.error(error.message || "Failed to create movie");
//     }
//   };

//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//         style={{
//           zIndex: 1000000000000000000,
//         }}
//       />
//       <div className="flex h-screen bg-gray overflow-hidden">
//         <div className="flex-1 overflow-hidden">
//           <div className="h-full overflow-y-auto px-8 py-6">
//             <div className="bg-gray-900 rounded-xl shadow-xl p-8">
//               <div className="max-w-6xl mx-auto">
//                 <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700 mt-2">
//                   Create Movie
//                 </h1>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Name:
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={movieData.name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                         placeholder="Enter movie name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Year:
//                       </label>
//                       <input
//                         type="number"
//                         name="year"
//                         value={movieData.year}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                         placeholder="Enter release year"
//                         min="1900"
//                         max={new Date().getFullYear()}
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Genre:
//                       </label>
//                       <select
//                         name="genre"
//                         value={movieData.genre}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                       >
//                         {isLoadingGenres ? (
//                           <option>Loading genres...</option>
//                         ) : (
//                           genres?.map((genre) => (
//                             <option key={genre._id} value={genre._id}>
//                               {genre.name}
//                             </option>
//                           ))
//                         )}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Cast (comma-separated):
//                       </label>
//                       <input
//                         type="text"
//                         name="cast"
//                         value={
//                           Array.isArray(movieData.cast)
//                             ? movieData.cast.join(",")
//                             : movieData.cast
//                         }
//                         onChange={(e) =>
//                           setMovieData({
//                             ...movieData,
//                             cast: e.target.value
//                               .split(",")
//                               .map((item) => item.trim()),
//                           })
//                         }
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                         placeholder="Enter cast names"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Rating:
//                       </label>
//                       <div className="flex space-x-1">
//                         {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
//                           <Star
//                             key={star}
//                             size={24}
//                             className={`cursor-pointer transition-colors ${
//                               star <= (hoveredRating || movieData.rating)
//                                 ? "text-yellow-400 fill-yellow-400"
//                                 : "text-gray-400"
//                             }`}
//                             onMouseEnter={() => setHoveredRating(star)}
//                             onMouseLeave={() => setHoveredRating(0)}
//                             onClick={() =>
//                               setMovieData((prev) => ({
//                                 ...prev,
//                                 rating: star,
//                               }))
//                             }
//                           />
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Tier:
//                       </label>
//                       <select
//                         name="tier"
//                         value={movieData.tier[0]}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
//                       >
//                         <option value="silver">Silver</option>
//                         <option value="gold">Gold</option>
//                         <option value="platinum">Platinum</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Detail:
//                       </label>
//                       <textarea
//                         name="detail"
//                         value={movieData.detail}
//                         onChange={handleChange}
//                         rows="4"
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
//                         placeholder="Enter movie details"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Upload Image:
//                       </label>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-200 mb-2">
//                         Upload Video:
//                       </label>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoChange}
//                         className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-8">
//                   <button
//                     type="button"
//                     onClick={handleCreateMovie}
//                     disabled={isCreatingMovie}
//                     className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     {isCreatingMovie ? (
//                       <span className="flex items-center justify-center">
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Creating...
//                       </span>
//                     ) : (
//                       "Create Movie"
//                     )}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateMovie;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMovieMutation } from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Star } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const CreateMovie = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [movieData, setMovieData] = useState({
    name: "", // Movie name
    year: "", // Release year
    detail: "", // Movie details
    cast: [], // Array of cast members
    rating: 0, // Initial rating (out of 10)
    genre: "comedy", // Genre ID
    tier: "silver", // Default tier value
  });
  const [loading, setLoading] = useState(false);
  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation({
    fixedCacheKey: "create-movie", // Optional, for caching consistency
    credentials: "include", // Ensures cookies are sent with the request
  });

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres?.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year") {
      const yearValue = parseInt(value) || "";
      setMovieData((prevData) => ({
        ...prevData,
        [name]: yearValue,
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected Image:", file);
    setSelectedImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected video:", file);
    setSelectedVideo(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name?.trim() ||
        !movieData.year ||
        !movieData.detail.trim() ||
        !movieData.genre ||
        !selectedImage ||
        !selectedVideo ||
        movieData.rating === 0 ||
        !movieData.cast ||
        movieData.cast.length === 0 ||
        !movieData.tier.trim()
        
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("name", movieData.name.trim());
      formData.append("year", movieData.year);
      formData.append("detail", movieData.detail.trim());
      formData.append("cast", JSON.stringify(movieData.cast)); // Convert array to JSON string
      formData.append("rating", movieData.rating);
      formData.append("genre", movieData.genre);
      formData.append("tier", movieData.tier);
      formData.append("image", selectedImage); // Append image file
      formData.append("video", selectedVideo); // Append video file

      // const result = await createMovie(formData).unwrap();
      setLoading(true);
      const response = await axios.post(
  "http://localhost:3000/api/v1/movies/create-movie",
  formData, // Pass `formData` as the payload
  {
    withCredentials: true, // Include cookies for authentication
    headers: {
      "Content-Type": "multipart/form-data", // Set appropriate content type
    },
  }
);
      // console.log(movieData);

      // const [
      //   createMovie,
      //   { isLoading: isCreatingMovie, error: createMovieErrorDetail },
      // ] = useCreateMovieMutation();
      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
        // window.location.href = "/admin/movies-list";
      }
    } catch (error) {
      console.log("Error creating movie:", error);
      toast.error(error.message || "Failed to create movie");
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{
          zIndex: 1000000000000000000,
        }}
      />
      <div className="flex h-screen   bg-gray overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto px-8 py-6">
            <div className="bg-gray-900 rounded-xl shadow-xl p-8">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8 pb-4 border-b border-gray-700 mt-2">
                  Create Movie
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Name:
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

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Year:
                      </label>
                      <input
                        type="number"
                        name="year"
                        value={movieData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                        placeholder="Enter release year"
                        min="1900"
                        max={new Date().getFullYear()}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Genre:
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

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Cast (comma-separated):
                      </label>
                      <input
                        type="text"
                        name="cast"
                        value={
                          Array.isArray(movieData.cast)
                            ? movieData.cast.join(",")
                            : movieData.cast
                        }
                        onChange={(e) =>
                          setMovieData({
                            ...movieData,
                            cast: e.target.value
                              .split(",")
                              .map((item) => item.trim()),
                          })
                        }
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
                        placeholder="Enter cast names"
                      />
                    </div>

                    {/* Added Rating Stars */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Rating:
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
                              setMovieData((prev) => ({
                                ...prev,
                                rating: star,
                              }))
                            }
                          />
                        ))}
                      </div>
                    </div>

                    {/* Added Tier Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Tier:
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
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Detail:
                      </label>
                      <textarea
                        name="detail"
                        value={movieData.detail}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors resize-none"
                        placeholder="Enter movie details"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Upload Image:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Upload Video:
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="w-full px-4 py-3 bg-gray-800 rounded-lg border border-gray-700 text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleCreateMovie}
                    disabled={loading}
                    className="w-full bg-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
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
                        Creating...
                      </span>
                    ) : (
                      "Create Movie"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMovie;
