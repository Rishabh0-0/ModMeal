import React from "react";
import InputForm from "../FormComponents/InputForm";
import UserIcon from "../../assets/user_17061312.png";
import mailIcon from "../../assets/mail_6438139.png";
import passIcon from "../../assets/password_9476918.png";
import FormBtn from "../../../UI/FormBtn";

const Register = () => {
  return (
    <form action="" className="flex flex-col gap-2">
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
  );
};

export default Register;
