// import { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../component/Loader";
// import { setCredentials } from "../../redux/features/auth/authSlice";
// import { useLoginMutation } from "../../redux/api/users";
<<<<<<< Updated upstream
// import { toast, ToastContainer } from "react-toastify";
// import bg from "../../assets/login_half.png";
// import logo from "../../assets/play-box-logo.png";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState({});
=======
// import { toast } from "react-toastify";
// import bg from "../../assets/login_half.png";
// import logo from "../../assets/play-box-logo.png";
 
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
>>>>>>> Stashed changes

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [login, { isLoading }] = useLoginMutation();
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get("redirect") || "/";

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

<<<<<<< Updated upstream
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Email is invalid";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const res = await login(formData).unwrap();
//         dispatch(setCredentials({ ...res }));
//         toast.success("Login successful!");
//         navigate(redirect);
//       } catch (err) {
//         toast.error(err?.data?.message || "Invalid email or password");
//       }
//     } else {
//       // Display first error message
//       const firstError = Object.values(errors)[0];
//       toast.error(firstError);
=======
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await login({ email, password }).unwrap();
//       dispatch(setCredentials({ ...res }));
//       navigate(redirect);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
>>>>>>> Stashed changes
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#050813]">
<<<<<<< Updated upstream
//       {/* Toast Container */}
//       <ToastContainer
//         position="top-right" // Position toast above the header
//         autoClose={3000}
//         hideProgressBar={false}
//         zindex={120}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
//         <div className="mb-8">
//           <img src={logo} alt="PlayBox Logo" className="h-[3rem] w-auto" />
=======
//       {/* Left Section (Form) */}
//       <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
//         {/* PlayBox Logo */}
//         <div className="mb-8">
//           <img
//             src={logo}
//             alt="PlayBox Logo"
//             className="h-[3rem] w-auto"
//           />
>>>>>>> Stashed changes
//         </div>

//         <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

//         <form onSubmit={submitHandler} className="w-[75%]">
//           <div className="my-[3rem]">
<<<<<<< Updated upstream
//             <label htmlFor="email" className="block text-sm font-medium">
//               Email Address <span className="text-red-500">*</span>
=======
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium"
//             >
//               Email Address
>>>>>>> Stashed changes
//             </label>
//             <input
//               type="email"
//               id="email"
<<<<<<< Updated upstream
//               name="email"
//               className={`mt-1 p-2 w-full border-b ${
//                 errors.email ? "border-red-500" : "border-white"
//               } bg-transparent text-white focus:outline-none`}
//               placeholder="Enter Email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             {errors.email && (
//               <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div className="my-[2rem]">
//             <label htmlFor="password" className="block text-sm font-medium">
//               Password <span className="text-red-500">*</span>
=======
//               className="mt-1 p-2 w-full border-b border-white bg-transparent text-white focus:outline-none"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           <div className="my-[2rem]">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium"
//             >
//               Password
>>>>>>> Stashed changes
//             </label>
//             <input
//               type="password"
//               id="password"
<<<<<<< Updated upstream
//               name="password"
//               className={`mt-1 p-2 w-full border-b ${
//                 errors.password ? "border-red-500" : "border-white"
//               } bg-transparent text-white focus:outline-none`}
//               placeholder="Enter Password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             {errors.password && (
//               <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//             )}
=======
//               className="mt-1 p-2 w-full border-b border-white bg-transparent text-white focus:outline-none"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
>>>>>>> Stashed changes
//           </div>

//           <button
//             disabled={isLoading}
//             type="submit"
<<<<<<< Updated upstream
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem] disabled:opacity-50"
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </button>

=======
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem]"
//           >
//             {isLoading ? "Signing In ..." : "Sign In"}
//           </button>
>>>>>>> Stashed changes
//           {isLoading && <Loader />}
//         </form>

//         <div className="mt-4 text-center w-full">
//           <p>
//             New Customer?{" "}
//             <Link
//               to={redirect ? `/register?redirect=${redirect}` : "/register"}
//               className="text-teal-500 hover:underline"
//             >
//               Register
//             </Link>
//           </p>
//         </div>
//       </div>
<<<<<<< Updated upstream
//       <div className="w-[60%] h-full">
//         <img src={bg} alt="Background" className="h-full w-full object-cover" />
=======

//       {/* Right Section (Image) */}
//       <div className="w-[60%] h-full">
//         <img
//           src={bg}
//           alt="Background"
//           className="h-full w-full object-cover"
//         />
>>>>>>> Stashed changes
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../redux/api/users";
import { toast, ToastContainer } from "react-toastify";
<<<<<<< Updated upstream
import bg from "../../assets/login_half.png";
import logo from "../../assets/play-box-logo.png";
=======
// import bg from "https://images.pexels.com/photos/27269560/pexels-photo-27269560/free-photo-of-marti.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
// import logo from "https://images.pexels.com/photos/27269560/pexels-photo-27269560/free-photo-of-marti.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load";
>>>>>>> Stashed changes

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await login(formData).unwrap();
        dispatch(setCredentials({ ...res }));
<<<<<<< Updated upstream

        // Show success toast and wait before navigating
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: () => {
            navigate(redirect);
          },
        });

        // Add a delay before navigation to ensure toast is visible
        setTimeout(() => {
          navigate(redirect);
        }, 2000);
      } catch (err) {
        toast.error(err?.data?.message || "Invalid email or password", {
          position: "top-center",
          autoClose: 3000,
        });
=======
        toast.success("Login successful!");
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || "Invalid email or password");
>>>>>>> Stashed changes
      }
    } else {
      // Display first error message
      const firstError = Object.values(errors)[0];
<<<<<<< Updated upstream
      toast.error(firstError, {
        position: "top-center",
        autoClose: 3000,
      });
=======
      toast.error(firstError);
>>>>>>> Stashed changes
    }
  };

  return (
    <div className="flex h-screen bg-[#050813]">
<<<<<<< Updated upstream
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
=======
      {/* Toast Container */}
      {/* <ToastContainer
        position="top-right" // Position toast above the header
        autoClose={3000}
        hideProgressBar={false}
        zindex={12}
>>>>>>> Stashed changes
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
<<<<<<< Updated upstream
        theme="dark"
      />

      <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
        <div className="mb-8">
          <img src={logo} alt="PlayBox Logo" className="h-[3rem] w-auto" />
=======
      /> */}
      <div className="w-[40%] flex flex-col justify-center items-start pl-[5rem] text-white">
        <div className="mb-8">
          {/* <img src={logo} alt="PlayBox Logo" className="h-[3rem] w-auto" /> */}
>>>>>>> Stashed changes
        </div>

        <h1 className="text-2xl font-semibold mb-4">Sign In</h1>

        <form onSubmit={submitHandler} className="w-[75%]">
          <div className="my-[3rem]">
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`mt-1 p-2 w-full border-b ${
                errors.email ? "border-red-500" : "border-white"
              } bg-transparent text-white focus:outline-none`}
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="my-[2rem]">
            <label htmlFor="password" className="block text-sm font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`mt-1 p-2 w-full border-b ${
                errors.password ? "border-red-500" : "border-white"
              } bg-transparent text-white focus:outline-none`}
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full my-[1rem] disabled:opacity-50"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          {isLoading && <Loader />}
<<<<<<< Updated upstream

          <div className="mt-4 text-center w-full">
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-teal-500 hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
      <div className="w-[60%] h-full">
        <img src={bg} alt="Background" className="h-full w-full object-cover" />
=======
        </form>

        <div className="mt-4 text-center w-full">
          <p>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              className="text-teal-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <div className="w-[60%] h-full">
        {/* <img src={bg} alt="Background" className="h-full w-full object-cover" /> */}
>>>>>>> Stashed changes
      </div>
    </div>
  );
};

export default Login;
