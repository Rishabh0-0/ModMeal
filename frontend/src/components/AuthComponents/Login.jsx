import { useState } from "react";
import mailIcon from "../../assets/mail_6438139.png";
import passIcon from "../../assets/password_9476918.png";
import InputForm from "../FormComponents/InputForm";
import FormBtn from "../../../UI/FormBtn";
import { useAuth } from "../../store/auth-context";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const validateForm = (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (formData) => {
    if (!validateForm(formData)) return;

    setError("");

    try {
      const result = await login(
        formData.get("email"),
        formData.get("password")
      );
      if (!result.success) {
        setError(result.message);
      }
    } catch {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-2 w-full">
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
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
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Remember me
        </label>
        <a href="#" className="text-indigo-600 hover:text-indigo-800">
          Forgot password?
        </a>
      </div>
      <FormBtn variant="primary">Continue</FormBtn>
    </form>
  );
};

export default Login;
