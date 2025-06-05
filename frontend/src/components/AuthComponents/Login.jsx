import mailIcon from "../../assets/mail_6438139.png";
import passIcon from "../../assets/password_9476918.png";
import InputForm from "../FormComponents/InputForm";
import FormBtn from "../../../UI/FormBtn";

import { useAuth } from "../../store/auth-context";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await login(email, password);
    if (!result.success) {
      setError(result.message);
    }
    console.log(result.message);
    setLoading(false);
  };

  return (
    <>
      {error && <p>{error}</p>}
      <form action={handleSubmit} className="flex flex-col gap-2 w-full">
        <InputForm
          id="login-email"
          name="email"
          type="email"
          title="Email Address"
          required={true}
          icon={mailIcon}
        />
        <InputForm
          id="login-password"
          name="password"
          type="password"
          title="Password"
          required={true}
          icon={passIcon}
        />
        <FormBtn variant="primary">
          {loading ? "Logingin..." : "Continue"}
        </FormBtn>
      </form>
    </>
  );
};

export default Login;
