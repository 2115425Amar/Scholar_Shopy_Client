// import React, { useEffect, useState } from "react";
// import AdminMenu from "../../components/Layout/AdminMenu";
// import Layout from "./../../components/Layout/Layout";
// import axios from "axios";

// const Users = async() => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API}/api/users`);
//         setUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [users]);

//   return (
//     <Layout title={"Dashboard - All Users"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>All Users</h1>
//             <ul>
//               {users?.map((user) => (
//                 <li key={user.id}>{user.name}</li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Users;

import React from 'react'

const Users = () => {
  return (
    <div>Users</div>
  )
}

export default Users