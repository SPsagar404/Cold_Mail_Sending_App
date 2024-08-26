import React, { useState } from "react";
import { createUser } from "../../api/userService";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error when the user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let formValid = true;
    let newErrors = {};

    if (!formData.name.trim()) {
      formValid = false;
      newErrors.name = "Name is required.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      formValid = false;
      newErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      formValid = false;
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.organisation.trim()) {
      formValid = false;
      newErrors.organisation = "Organisation is required.";
    }

    setErrors(newErrors);
    return formValid;
  };

  const handleCreateUser = async(user) =>{
    try {
        await createUser(user);
        navigate("/users");
    } catch (error) {
        console.error("Error creating user", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Perform your form submission logic here
      console.log("Form submitted:", formData);
        handleCreateUser(formData);
      // Reset form data after submission
      setFormData({
        name: "",
        email: "",
        organisation: "",
      });
    }
  };

  return (
    <div className="w-[50%] mx-auto">
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold text-lg mb-1">Name</label>
          <input
            required
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={`p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
          />
          {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg mb-1">Email</label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john.d@example.com"
            className={`p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`}
          />
          {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-lg mb-1">Organisation</label>
          <input
            required
            type="text"
            name="organisation"
            value={formData.organisation}
            onChange={handleInputChange}
            placeholder="FutureWork"
            className={`p-3 border ${errors.organisation ? "border-red-500" : "border-gray-300"} rounded`}
          />
          {errors.organisation && <span className="text-red-500 text-sm mt-1">{errors.organisation}</span>}
        </div>

        <button className="py-3 px-8 rounded bg-black text-white font-semibold hover:bg-rose-600">
          Add HR User
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
