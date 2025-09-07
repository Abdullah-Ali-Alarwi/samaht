"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerAction } from "@/src/actions/regester.aciton";
import AlertRegistration from "./AlertRegistration";
import Spinner from "../../components/Ui/spinner";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const FormHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationMessage("");
    setLoading(true);

    try {
      const result = await registerAction({
        name,
        phone,
        email,
        password,
        confirmPassword,
      });

      if (!result.success) {
        setValidationMessage(result.error || "Error registering user");
        toast.error(result.error || "Error registering user");
        return;
      }

      toast.success(result.message || "User registered successfully!");
      router.push("/verify");
    } catch (error) {
      console.error(error);
      setValidationMessage("Something went wrong!");
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={FormHandler} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
      />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border p-3 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {showConfirmPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {validationMessage && <AlertRegistration message={validationMessage} />}

      <button
        type="submit"
        disabled={loading}
        className="bg-yellow-400 hover:bg-yellow-500 transition text-white font-semibold px-4 py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? <Spinner /> : "Register"}
      </button>
    </form>
  );
}
