// import { useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import {
//   useGetSpecificMovieQuery,
//   useAddMovieReviewMutation,
// } from "../../redux/api/movies";
// import MovieTabs from "./MovieTabs";
// import { PlayCircle } from "lucide-react";

// const MovieDetails = () => {
//   const { id: movieId } = useParams();
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
//   const { userInfo } = useSelector((state) => state.auth);
//   const [createReview, { isLoading: loadingMovieReview }] =
//     useAddMovieReviewMutation();

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       await createReview({
//         id: movieId,
//         rating,
//         comment,
//       }).unwrap();

//       refetch();

//       toast.success("Review created successfully");
//     } catch (error) {
//       toast.error(error.data || error.message);
//     }
//   };

//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       <div className="max-w-screen-xl mx-auto p-6">
//         {/* Go Back Link */}
//         <Link
//           to="/"
//           className="text-white font-semibold hover:underline text-lg md:text-2xl"
//         >
//           ← Go Back
//         </Link>

//         {/* Main Content */}
//         <div className="mt-8 md:mt-12 lg:flex lg:space-x-8">
//           {/* Movie Image */}
//           <div className="flex justify-center lg:flex-none lg:w-1/2">
//             <img
//               src={movie?.image}
//               alt={movie?.name}
//               className="w-full md:w-3/4 lg:w-full rounded-lg shadow-lg"
//             />
//           </div>

//           {/* Movie Info */}
//           <div className="mt-8 lg:mt-0 lg:w-1/2">
//             {/* Movie Title and Play Button */}
//             <div className="flex items-center space-x-6">
//               <h2 className="text-3xl md:text-5xl font-bold">{movie?.name}</h2>
//             </div>

//             {/* Movie Details */}
//             <p className="mt-4 text-gray-400 max-w-lg">{movie?.detail}</p>

//             <button className="flex items-center px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition transform hover:scale-105 mt-5">
//               <PlayCircle className="w-8 h-8 mr-2" />
//               <span className="font-semibold">Watch Now</span>
//             </button>

//             {/* Release Date & Cast */}
//             <div className="mt-8 space-y-4">
//               <p className="text-xl font-semibold">
//                 Releasing Date:{" "}
//                 <span className="text-gray-400">{movie?.year}</span>
//               </p>
//               <div>
//                 <h3 className="text-xl font-semibold">Cast:</h3>
//                 <ul className="text-gray-400">
//                   {movie?.cast.map((c) => (
//                     <li key={c._id} className="mt-2 text-lg">
//                       {c}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs for Reviews */}
//         <div className="mt-12 md:mt-16">
//           <MovieTabs
//             loadingMovieReview={loadingMovieReview}
//             userInfo={userInfo}
//             submitHandler={submitHandler}
//             rating={rating}
//             setRating={setRating}
//             comment={comment}
//             setComment={setComment}
//             movie={movie}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;

import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetSpecificMovieQuery,
  useAddMovieReviewMutation,
} from "../../redux/api/movies";
import MovieTabs from "./MovieTabs";
import { PlayCircle, ArrowLeft, Star, Calendar, Users } from "lucide-react";

const MovieDetails = () => {
  const { id: movieId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [isDownloadDisabled, setIsDownloadDisabled] = useState(false);
  const { data: movie, refetch } = useGetSpecificMovieQuery(movieId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingMovieReview }] =
    useAddMovieReviewMutation();

  const videoRef = useRef(null); // Reference for the video element

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id: movieId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error.data || error.message);
    }
  };

  // Function to handle the "Watch Now" button click
  const handleWatchNow = () => {
    setVideoUrl(movie?.video); // Set the video URL from the movie object
    setIsPlaying(true); // Set playing to true to show video
    setIsDownloadDisabled(true); // Disable the download button

    // Make the video element full screen
    if (videoRef.current) {
      // Request fullscreen on the video element itself
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section with Backdrop */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie?.image})`,
          backgroundPosition: "center 20%",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900"></div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            to="/"
            className="flex items-center space-x-2 text-white/90 hover:text-white transition-colors px-4 py-2 rounded-lg bg-black/30 backdrop-blur-sm hover:bg-black/40"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Movie Poster */}
          <div className="flex justify-center lg:justify-start">
            <div className="w-64 lg:w-full max-w-sm">
              <img
                src={movie?.image}
                alt={movie?.name}
                className="rounded-2xl shadow-2xl shadow-black/50 transform hover:scale-105 transition-transform duration-300 border-2 border-gray-800"
              />
            </div>
          </div>

          {/* Movie Info */}
          <div className="mt-8 lg:mt-0 lg:col-span-2">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {movie?.name}
            </h1>

            {/* Movie Stats */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center space-x-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-medium">4.5/5</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-400">
                <Calendar className="w-5 h-5" />
                <span>{movie?.year}</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-400">
                <Users className="w-5 h-5" />
                <span>{movie?.cast?.length} Cast Members</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              {movie?.detail}
            </p>

            {/* Watch Button */}
            <button
              onClick={handleWatchNow}
              className="group flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
            >
              <PlayCircle className="w-6 h-6 mr-3 transform group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">Watch Now</span>
            </button>

            {/* Cast Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-4 text-white/90">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {movie?.cast?.map((actor, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-800 transition-colors"
                  >
                    <p className="text-gray-300">{actor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <MovieTabs
            loadingMovieReview={loadingMovieReview}
            userInfo={userInfo}
            submitHandler={submitHandler}
            rating={rating}
            setRating={setRating}
            comment={comment}
            setComment={setComment}
            movie={movie}
          />
        </div>
      </div>

      {/* Fullscreen Video */}
      {isPlaying && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            autoPlay
            src={videoUrl}
          ></video>
        </div>
      )}

     
    </div>
  );
};

export default MovieDetails;
