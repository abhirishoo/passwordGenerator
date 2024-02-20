import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*~+_";
    for (let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const passwordRef = useRef(null);
  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character, setPassword]);

  return (
    <>
      <div className="bg-zinc-900 w-screen h-screen">
        <div className="text-5xl text-white p-5 font-bold text-center">
          Password Generator
          <div className="w-[90%] max-w-md mx-auto p-5 overflow-hidden rounded-md items-center mt-10 bg-zinc-800 flex flex-wrap justify-center">
            <input
              className="rounded-md w-full h-12 outline-none read-only: overflow-hidden text-black text-sm p-2 font-semibold mb-2"
              type="text"
              value={password}
              placeholder="Password"
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="bg-blue-900 hover:bg-blue-600 w-full rounded-md h-12 font-regular text-sm"
            >
              Copy
            </button>
            <div className="w-[95%] flex flex-wrap justify-start mt-2">
              <div className="flex w-full px-2 items-center">
                <input
                  type="range"
                  onChange={(e) => {
                    setLength(e.target.value);
                  }}
                  value={length}
                  className="cursor-pointer w-full"
                  min={8}
                  max={32}
                />
                <span className="p-1  flex flex-wrap justify-between text-sm">  Length:{length}</span>
              </div>
              <div className="flex w-full px-2 items-center">
                <input
                  type="checkbox"
                  defaultChecked={number}
                  onChange={() => {
                    setNumber((prev) => !prev);
                  }}
                />
                <span className="p-1 text-sm">Numbers</span>
              </div>
              <div className="flex w-full px-2 items-center">
                <input
                  type="checkbox"
                  defaultChecked={character}
                  onChange={() => {
                    setCharacter((prev) => !prev);
                  }}
                />
                <span className="p-1 text-sm">Characters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
