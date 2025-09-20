import { useState } from "react";

export const useNewsletter = () => {
  const [email, setEmail] = useState("");

  const submitNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setEmail("");
  };

  return {
    email,
    setEmail,
    submitNewsletter,
  };
};
