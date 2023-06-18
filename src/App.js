import React from "react";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const initialValues = {
    firstname: "",
    lastname: "",
    mobnum: "",
    email: "",
    username: "",
    age: "",
    password: "",
  };

  const [formvValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formvValues, [name]: value });
    console.log(formvValues);
  };

  // Submission Handling
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formvValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formvValues);
    }
  }, [formErrors]);

  // Validation
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const mobRegex = /^[0-9]{10}$/;

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!values.firstname) {
      errors.firstname = "First Name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Last Name is required!";
    }
    if (!values.mobnum) {
      errors.mobnum = "Mobile Number is required!";
    } else if (!mobRegex.test(values.mobnum)) {
      errors.mobnum = "Invalid Mobile Number!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email Format!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.age) {
      errors.age = "Age is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password must be atleast 8 characters!";
    } else if (values.password.length > 15) {
      errors.password = "Password must not exceed 15 characters!";
    } else if (!passRegex.test(values.password)) {
      errors.password =
        "Password must contain atleast 1 uppercase, 1 lowercase, 1 number and 1 special character!";
    }

    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="success">Success</div>
      ) : (
        <pre>{JSON.stringify(formvValues, undefined, 2)}</pre>
      )}

      <form onSubmit={handleSubmit}>
        <h1>Registration Form</h1>
        <br />
        <div className="input-field">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formvValues.firstname}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.firstname}</p>

        <div className="input-field">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formvValues.lastname}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.lastname}</p>

        <div className="input-field">
          <label>Mobile Number</label>
          <input
            type="text"
            name="mobnum"
            placeholder="Mobile"
            value={formvValues.mobnum}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.mobnum}</p>

        <div className="input-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formvValues.email}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.email}</p>

        <div className="input-field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formvValues.username}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.username}</p>

        <div className="input-field">
          <label>Age</label>
          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formvValues.age}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.age}</p>

        <div className="input-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formvValues.password}
            onChange={handleChange}
          />
        </div>
        <p>{formErrors.password}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
