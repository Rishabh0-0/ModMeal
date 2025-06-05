import React, { useState } from "react";
import InputForm from "../FormComponents/InputForm";
import UserIcon from "../../assets/user_17061312.png";
import mailIcon from "../../assets/mail_6438139.png";
import passIcon from "../../assets/password_9476918.png";
import FormBtn from "../../../UI/FormBtn";

import { useAuth } from "../../store/auth-context";

const Register = () => {
  const { register } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setError(null);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await register(username, email, password);
    if (!result.success) {
      setError(result.message);
    }
    console.log(result.message);
  };

  return (
    <>
      {error && <p> {error} </p>}
      <form action={handleSubmit} className="flex flex-col gap-2">
        <InputForm
          id="register-username"
          name="username"
          title="username"
          required={true}
          icon={UserIcon}
        />
        <InputForm
          id="register-email"
          name="email"
          type="email"
          title="Email Address"
          required={true}
          icon={mailIcon}
        />
        <InputForm
          id="register-password"
          name="password"
          type="password"
          title="Password"
          required={true}
          icon={passIcon}
        />
        <FormBtn variant="secondary">Register</FormBtn>
      </form>
    </>
  );
};

export default Register;
