import React, { useState } from "react";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
    address: {
      city: "",
      street: "",
      number: "",
      zipcode: "",
      geolocation: { lat: "", long: "" },
    },
    phone: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update nested state for name and address
    if (name.includes("name.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, [key]: value },
      }));
    } else if (name.includes("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        setSuccess("Customer added successfully!");
        setFormData({
          email: "",
          username: "",
          password: "",
          name: { firstname: "", lastname: "" },
          address: {
            city: "",
            street: "",
            number: "",
            zipcode: "",
            geolocation: { lat: "", long: "" },
          },
          phone: "",
        });
      } else {
        setError(json.message || "Failed to add customer");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Customer</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-5"
      >
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            name="name.firstname"
            value={formData.name.firstname}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            name="name.lastname"
            value={formData.name.lastname}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Street</label>
          <input
            type="text"
            name="address.street"
            value={formData.address.street}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Number</label>
          <input
            type="number"
            name="address.number"
            value={formData.address.number}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Zipcode</label>
          <input
            type="text"
            name="address.zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Latitude</label>
          <input
            type="text"
            name="address.geolocation.lat"
            value={formData.address.geolocation.lat}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Longitude</label>
          <input
            type="text"
            name="address.geolocation.long"
            value={formData.address.geolocation.long}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-primary text-white p-2 rounded">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
