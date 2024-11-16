// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="-translate-y-10 flex h-screen fixed mt-10 border-r-2 border-[#242424]">
//       <aside className="text-white w-64 flex-shrink-0">
//         <ul className="py-4">
//           <li className="text-lg  bg-gradient-to-b from-green-500 to-lime-400 rounded-full -translate-x-6">
//             <Link
//               to="/admin/movies/dashboard"
//               className="block p-2 ml-20 mb-10"
//             >
//               Dashboard
//             </Link>
//           </li>
//           <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full">
//             <Link to="/admin/movies/create" className="block p-2 ml-20 mb-10">
//               Create Movie
//             </Link>
//           </li>
//           <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full">
//             <Link to="/admin/movies/genre" className="block p-2 ml-20 mb-10">
//               Create Genre
//             </Link>
//           </li>
//           <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full">
//             <Link to="/admin/movies-list" className="block p-2 ml-20 mb-10">
//               Update Movie
//             </Link>
//           </li>
//           <li className="text-lg -translate-x-6 hover:bg-gradient-to-b from-green-500 to-lime-400 rounded-full">
//             <Link to="/admin/movies/comments" className="block p-2 ml-20 mb-10">
//               Comments
//             </Link>
//           </li>
//         </ul>
//       </aside>
//     </div>
//   );
// };

// export default Sidebar;


import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FilmIcon,
  Tags,
  Edit,
  MessageSquare,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin/movies/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      title: "Create Movie",
      path: "/admin/movies/create",
      icon: <FilmIcon className="w-5 h-5" />,
    },
    {
      title: "Create Genre",
      path: "/admin/movies/genre",
      icon: <Tags className="w-5 h-5" />,
    },
    {
      title: "Update Movie",
      path: "/admin/movies-list",
      icon: <Edit className="w-5 h-5" />,
    },
    {
      title: "Comments",
      path: "/admin/movies/comments",
      icon: <MessageSquare className="w-5 h-5" />,
    },
  ];

  return (
    <div className="h-screen fixed border-r border-gray-800 bg-gray-900">
      <aside className="flex flex-col w-64 h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul className="p-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-green-500 to-lime-400 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-medium">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors duration-200">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center mr-3">
              <span className="text-sm font-medium">A</span>
            </div>
            <span className="font-medium">Admin User</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar; 