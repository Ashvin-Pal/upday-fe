import { useState } from "react";
import { Button } from "../button";
import { TextInput } from "../input";

const validateEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

interface FormStateType {
  isValid: boolean;
  isSubmitted: boolean;
}

interface LoginFormType {
  handleSucess(email: string): void;
}

export function LoginForm({ handleSucess }: LoginFormType) {
  const [formState, setFormState] = useState<FormStateType>({ isValid: false, isSubmitted: false });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    validateEmail.test(email)
      ? handleSucess(email)
      : setFormState({ isValid: false, isSubmitted: true });
  };

  const displayErrorMsg = formState.isSubmitted && !formState.isValid;

  return (
    <section className="Login__Section">
      <h1 className="Login__Section__Title">upday</h1>
      <form className="Login__Form" onSubmit={handleSubmit} autoComplete="on" noValidate>
        <h3 className="Login__Form__Title">Sign in</h3>
        <TextInput
          label="Your email"
          name="email"
          type="email"
          placeholder="stella@upday.com"
          displayError={displayErrorMsg}
          errorMessage="Invalid email"
        />
        <Button type="submit">Sign in</Button>
      </form>
    </section>
  );
}
