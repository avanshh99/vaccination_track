// import { NavLink } from "react-router-dom";
// import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
// import { MdMessage } from "react-icons/md";
// import { BiAnalyse, BiSearch } from "react-icons/bi";
// import { BiCog } from "react-icons/bi";
// import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
// import { MdDeleteForever } from "react-icons/md";
// import { MdOutlineNotificationsActive } from "react-icons/md";
// import { RiCalendarScheduleFill } from "react-icons/ri";
// import { MdVaccines } from "react-icons/md";
// import { GrContactInfo } from "react-icons/gr";
// import { BsCartCheck } from "react-icons/bs";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import SidebarMenu from "./SidebarMenu";
// const routes = [
//   {
//     path: "/",
//     name: "Vaccine Register",
//     icon: <MdVaccines />,
//   },
//   {
//     path: "/users",
//     name: "Center Directory",
//     icon: <GrContactInfo />,
//   },

//   {
//     path: "/order",
//     name: "Schedule Overview",
//     icon: <RiCalendarScheduleFill />,
//   },
//   {
//     path: "/order",
//     name: "Notify Parent",
//     icon: <MdOutlineNotificationsActive />,
//   },
// ];

// const SideBar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const inputAnimation = {
//     hidden: {
//       width: 0,
//       padding: 0,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     show: {
//       width: "140px",
//       padding: "5px 15px",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: "auto",
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };

//   return (
//     <>
//       <div className="main-container">
//         <motion.div
//           animate={{
//             width: isOpen ? "200px" : "45px",

//             transition: {
//               duration: 0.5,
//               type: "spring",
//               damping: 10,
//             },
//           }}
//           className={`sidebar `}
//         >
//           <div className="top_section">
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.h1
//                   variants={showAnimation}
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   className="logo"
//                 >
//                   DoSomeCoding
//                 </motion.h1>
//               )}
//             </AnimatePresence>

//             <div className="bars">
//               <FaBars onClick={toggle} />
//             </div>
//           </div>
//           <div className="search">
//             <div className="search_icon">
//               <BiSearch />
//             </div>
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.input
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   variants={inputAnimation}
//                   type="text"
//                   placeholder="Search"
//                 />
//               )}
//             </AnimatePresence>
//           </div>
//           <section className="routes">
//             {routes.map((route, index) => {
//               if (route.subRoutes) {
//                 return (
//                   <SidebarMenu
//                     setIsOpen={setIsOpen}
//                     route={route}
//                     showAnimation={showAnimation}
//                     isOpen={isOpen}
//                   />
//                 );
//               }

//               return (
//                 <NavLink
//                   to={route.path}
//                   key={index}
//                   className="link"
//                   activeClassName="active"
//                 >
//                   <div className="icon">{route.icon}</div>
//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         variants={showAnimation}
//                         initial="hidden"
//                         animate="show"
//                         exit="hidden"
//                         className="link_text"
//                       >
//                         {route.name}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </NavLink>
//               );
//             })}
//           </section>
//         </motion.div>

//         <main>{children}</main>
//       </div>
//     </>
//   );
// };
// export default SideBar;

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import VaccineRegisterForm from "../VaccineRegisterForm/VaccineRegisterForm";

const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Vaccine Register", src: "add-vaccine", gap: true, path: "/vaccine-register" },
    { title: "Centre Info", src: "center-info", gap: true },
    { title: "Schedule Viewer", src: "schedule", gap: true },
    { title: "Notify Parent", src: "notify", gap: true },
    { title: "Chart of Vaccines", src: "chart", gap: true },
  ];

  return (
    <Router>
      <div className="flex">
        <div
          className={`${
            open ? "w-72" : "w-20"
          } bg-gradient-to-b from-[#E6E9FF] to-[#6495ED] h-screen p-5 pt-8 relative duration-300`}
        >
          <img
            src="./src/assets/sidebar_icons/control.png"
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-[#6495ED] border-2 rounded-full ${
              !open && "rotate-180"
            }`}
            onClick={() => setOpen(!open)}
          />
          <div className="flex gap-x-4 items-center">
            <img
              src="./src/assets/sidebar_icons/admin.png"
              className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
            />
            <h1
              className={`text-black origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Center Admin
            </h1>
          </div>
          <ul className="pt-6"> 
            {Menus.map((menu, index) => (
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-[#4F7FE5] transition-colors duration-200 ease-in-out text-black text-sm items-center gap-x-4 
                  ${menu.gap ? "mt-9" : "mt-2"}`}
              >
                <img src={`./src/assets/sidebar_icons/${menu.src}.png`} alt={menu.title} />
                <Link to={menu.path || "#"} className={`${!open && "hidden"} origin-left duration-200`}>
                  {menu.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="h-screen flex-1 p-7 bg-white overflow-auto">
          <Routes>
            <Route path="/vaccine-register" element={<VaccineRegisterForm />} />
            <Route path="/" element={<h1 className="text-2xl font-semibold">Home Page</h1>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;