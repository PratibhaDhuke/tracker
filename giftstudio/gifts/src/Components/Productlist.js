function Productlist({ list }) {
  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">price</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {list.map((data, id) => {
              return (
                <tr>
                  <th scope="row">{data.id}</th>
                  <td>{data.title}</td>
                  <td>{data.price}</td>
                  <td>{data.contactno}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Productlist;
