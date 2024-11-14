import React, { useState } from "react";

function Addproduct() {
  // State to hold the list of cards
  const [cards, setCards] = useState([]);
  // State to hold the form input values
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file upload and convert to a URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result, // Use base64 URL of the image
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission to add a new card
  const addCard = (e) => {
    e.preventDefault();
    setCards([...cards, formData]); // Add the new card
    setFormData({ image: "", title: "", price: "", description: "" }); // Reset form
  };

  return (
    <>
      <div className="col-6">
        <form onSubmit={addCard}>
          <div className="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-group">
            <label for="description">Description</label>
            <input
              name="description"
              type="text"
              className="form-control"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="price">Price</label>
            <input
              name="price"
              type="text"
              className="form-control"
              value={formData.price}
              placeholder="Enter price"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="fileUpload">Upload File</label>
            <input
              type="file"
              className="form-control-file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {/* Display the list of added cards side by side */}
      <div className="card-container addcartcont">
        {cards.map((card, index) => (
          <div key={index} className="col-2 addcartconts">
            {card.image && <img src={card.image} alt={card.title} />}
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <h4>{card.price}</h4>
          </div>
        ))}
      </div>
    </>
  );
}
export default Addproduct;
