// import {
//   useDeleteCommentMutation,
//   useGetAllMoviesQuery,
// } from "../../redux/api/movies";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "./Dashboard/Sidebar/Sidebar";

// const AllComments = () => {
//   const { data: movie, refetch } = useGetAllMoviesQuery();

//   const [deleteComment] = useDeleteCommentMutation();

//   const handleDeleteComment = async (movieId, reviewId) => {
//     try {
//       await deleteComment({ movieId, reviewId });
//       toast.success("Comment Deleted");
//       refetch();
//     } catch (error) {
//       console.error("Error deleting comment: ", error);
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
//           zIndex: 100000000000000,
//         }}
//       />
//       <div>
//         {/* Sidebar with fixed width */}
//         {/* <div className="w-64 flex-shrink-0">
//         <Sidebar/>
//       </div> */}
//         {movie?.map((m) => (
//           <section
//             key={m._id}
//             className="flex flex-col justify-center ml-[2rem] bg-gray-900 border-gray-700 text-white items-center"
//           >
//             {m?.reviews.map((review) => (
//               <div
//                 key={review._id}
//                 className="bg-[#1A1A1A] p-4 mt-[1rem] rounded-lg w-[50%] mt-[2rem]"
//               >
//                 <div className="flex justify-between  mt-[1rem]">
//                   <strong className="text-[#B0B0B0] mt-[1rem] ">
//                     {review.name}
//                   </strong>
//                   <p className="text-[#B0B0B0] mt-[1rem]">
//                     {review.createdAt.substring(0, 10)}
//                   </p>
//                 </div>

//                 <p className="my-4">{review.comment}</p>

//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDeleteComment(m._id, review._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </section>
//         ))}
//       </div>
//     </>
//   );
// };
// export default AllComments;


import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Dashboard/Sidebar/Sidebar";

const AllComments = () => {
  const { data: movie, refetch } = useGetAllMoviesQuery();

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
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
          zIndex: 100000000000000,
        }}
      />
      <div>
        {/* Sidebar with fixed width */}
        {/* <div className="w-64 flex-shrink-0">
        <Sidebar/>
      </div> */}
        {movie?.map((m) => (
          <section
            key={m._id}
            className="flex flex-col justify-center ml-[2rem] bg-gray-900 border-gray-700 text-white items-center"
          >
            {m?.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-[#1A1A1A] p-4 mt-[1rem] rounded-lg w-[50%] mt-[2rem]"
              >
                <div className="flex justify-between mt-[1rem]">
                  <strong className="text-[#B0B0B0] mt-[1rem] ">
                    {review.name}{" "}
                    <span className="text-[#B0B0B0]">- {m.name}</span>
                  </strong>
                  <p className="text-[#B0B0B0] mt-[1rem]">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="my-4">{review.comment}</p>

                <button
                  className="text-red-500"
                  onClick={() => handleDeleteComment(m._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
};
export default AllComments;




