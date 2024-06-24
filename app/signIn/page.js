"use client"
import { redirect } from "next/navigation";
import { login } from "@/lib";
import { useFormState, useFormStatus } from 'react-dom'
import { useState } from 'react';

export default function Page() {
  const [errorMessage, dispatch] = useFormState(login, undefined);
  // const [role, setRole] = useState('');

  // const handleRoleChange = (e) => {
  //   setRole(e.target.value);
  // };

  return (
    <form action={dispatch}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />

      {/* <div>
        <label>
          <input
            type="radio"
            name="role"
            value="teacher"
            checked={role === 'teacher'}
            onChange={handleRoleChange}
            required
          />
          Teacher
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="student"
            checked={role === 'student'}
            onChange={handleRoleChange}
            required
          />
          Student
        </label>
      </div> */}

      <div>{errorMessage && <p>{errorMessage}</p>}</div>

      <br />

      <LoginButton />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus()

  const handleClick = (event) => {
    if (pending) {
      event.preventDefault()
    }
  }

  return (
    <button aria-disabled={pending} type="submit" onClick={handleClick}>
      Login
    </button>
  )
}
