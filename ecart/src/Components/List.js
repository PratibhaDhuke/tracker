import { useEffect, useState } from "react";

export function List(props) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        return res.json();
      })

      .then((jsonobj) => {
        setUsers(() => jsonobj);
      });
    console.log("call use effect");
  }, []);

  return (
    <div className="user-list">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID#</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((data) => {
            return (
              <tr key={data.id}>
                <th scope="row">{data.id}</th>
                <td>{data.name}</td>
                <td>{data.phone}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// function List({ user }) {
//   return (
//     <>
//       <div className="container">
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">Product Name</th>
//               <th scope="col">price</th>
//               <th scope="col">Phone</th>
//             </tr>
//           </thead>
//           <tbody>
//             {user.map((data, id) => {
//               return (
//                 <tr>
//                   <th scope="row">{data.id}</th>
//                   <td>{data.name}</td>
//                   <td>{data.price}</td>
//                   <td>{data.phone}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

export default List;
