import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Icons from "../../Assets/Icons";
import { Brand } from "../../Components/Brand";
import Input from "../../Components/Form/Input";
import { useAuth, useUser } from "../../Hooks/Auth";

const RegisterForm = () => {
  const { registerUser } = useAuth();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    buisnessName: "",
    phoneNo: "",
    meta: {
      type: "WHOLESALER",
      accountStatus: "ACTIVE",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser(data, { onSuccess: () => {} });
  };

  return (
    <div className="pt-8 w-full lg:w-4/5">
      <form
        action=""
        method="POST"
        onSubmit={onSubmit}
        className="flex flex-col"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          label="Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          label="Buisness Name"
          name="buisnessName"
          value={data.buisnessName}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          label="Phone Number"
          name="phoneNo"
          value={data.phoneNo}
          onChange={handleChange}
          required
        />

        <input
          type="submit"
          value="Register"
          className="w-full bg-app-primary rounded text-white cursor-pointer mt-2 p-1 hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

const LoginForm = () => {
  const { loginUser } = useAuth();
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(data);
  };

  return (
    <div className="pt-8 w-full lg:w-4/5">
      <form
        action=""
        method="POST"
        onSubmit={onSubmit}
        className="flex flex-col"
      >
        <Input
          type="email"
          label="Username"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <input
          type="submit"
          value="Login"
          className="w-full bg-app-primary rounded text-white cursor-pointer mt-2 p-1 hover:bg-blue-500"
        />
      </form>
    </div>
  );
};

const AuthComponent = () => {
  const { isLoggedIn } = useUser();
  const [type, setType] = useState("LOGIN");

  const toggleType = () => setType(type === "LOGIN" ? "REGISTER" : "LOGIN");

  if (isLoggedIn) {
    return <Redirect to="/app" />;
  }

  return (
    <div className="w-screen h-screen flex bg-app-white">
      <div className="invisible md:visible w-0 md:w-3/5 h-screen flex items-center justify-center">
        <img src={Icons.ConnectIcon} alt="bg-login" className="w-3/5 h-full" />
      </div>
      <div className="w-full md:w-2/5 px-8 flex flex-col justify-center">
        <div>
          <Brand className="w-16 h-16" />
        </div>
        {type === "LOGIN" ? <LoginForm /> : <RegisterForm />}
        <div>
          <button
            onClick={toggleType}
            className="py-2 text-sm text-gray-600 hover:text-app-primary"
          >
            {type === "LOGIN" ? "Register here" : "Login here"} &#10230;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
