import "./Login.css";
import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function Login({ setEmail }:
  { setEmail: Dispatch<SetStateAction<string>> }) {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = EMAIL_REGEX.test(inputValue);
  const showError = touched && !isValid;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }
  function handleClick() {
    setTouched(true);
    if (!isValid) return;
    setEmail(inputValue);
  }
  return (
    <main className="login">
      <div className="input-box">
        {showError && <span className="error">Ingresá un email válido</span>}
        <input
          type="text"
          placeholder="Ingresar Email"
          value={inputValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
        />
      </div>
      <button onClick={handleClick}>Ingresar</button>
    </main>
  )
}