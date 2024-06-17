import React, { useState, useEffect } from "react";
import axios from "axios";

const StudentForm = ({ selectedStudent, fetchStudents }) => {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    gender: "",
    hobbies: [],
    country: "",
    state: "",
    city: "",
    address: "",
  });

  const countries = {
    India: {
      states: ["Maharashta", "Gujarat", "Rajasthan"],
      cities: ["mumbai", "Jamnagar", "Jaipur"],
    },
    UK: {
      states: [, "England", "Scotland"],
      cities: ["London", "Edinburgh"],
    },
  };

  useEffect(() => {
    if (selectedStudent) {
      setForm(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      setForm({
        ...form,
        country: value,
        state: "",
        city: "",
      });
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudent) {
      await axios.put(
        `http://localhost:4000/student/${selectedStudent._id}`,
        form
      );
    } else {
      await axios.post("http://localhost:4000/student", form);
    }
    setForm({
      name: "",
      surname: "",
      email: "",
      gender: "",
      hobbies: [],
      country: "",
      state: "",
      city: "",
      address: "",
    });
    fetchStudents();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" value={form._id || ""} />
      <label>Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <label>Surname:</label>
      <input
        type="text"
        name="surname"
        value={form.surname}
        onChange={handleChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <label>Gender:</label>
      <input
        type="radio"
        name="gender"
        value="Male"
        checked={form.gender === "Male"}
        onChange={handleChange}
      />{" "}
      Male
      <input
        type="radio"
        name="gender"
        value="Female"
        checked={form.gender === "Female"}
        onChange={handleChange}
      />{" "}
      Female
      <label>Hobbies:</label>
      <input
        type="checkbox"
        name="hobbies"
        value="Sports"
        checked={form.hobbies.includes("Sports")}
        onChange={handleChange}
      />{" "}
      Sports
      <input
        type="checkbox"
        name="hobbies"
        value="Reading"
        checked={form.hobbies.includes("Reading")}
        onChange={handleChange}
      />{" "}
      Reading
      <input
        type="checkbox"
        name="hobbies"
        value="Traveling"
        checked={form.hobbies.includes("Traveling")}
        onChange={handleChange}
      />{" "}
      Traveling
      <label>Country:</label>
      <select
        name="country"
        value={form.country}
        onChange={handleChange}
        required
      >
        <option value="">Select Country</option>
        {Object.keys(countries).map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <label>State:</label>
      <select name="state" value={form.state} onChange={handleChange} required>
        <option value="">Select State</option>
        {form.country &&
          countries[form.country].states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
      </select>
      <label>City:</label>
      <select name="city" value={form.city} onChange={handleChange} required>
        <option value="">Select City</option>
        {form.state &&
          countries[form.country].cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
      </select>
      <label>Address:</label>
      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default StudentForm;
