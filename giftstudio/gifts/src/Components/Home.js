function Home({ product }) {
  return (
    <>
      <div className="card-group crdgroup">
        {product.map((data, id) => {
          return (
            <div className="card">
              <img src={data.image} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <p className="card-text">{data.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">{data.price}</small>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
