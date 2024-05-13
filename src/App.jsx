import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength] = useState(7);
  const [numbers, useNumbers] = useState(false);
  const [chars, useChar] = useState(false);
  const [password, setPassword] = useState("");
  
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let pass = '';
    if (numbers) str += '1234567890';
    if (chars) str += '!@#$%^&*()_-?\|~';
    for (let i = 1; i <=length; i++){
      let ch_idx = Math.floor(Math.random() * (str.length));
      pass += str.charAt(ch_idx);
    }
    setPassword(pass);
  }, [length, numbers, chars, setPassword]);
  
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    // react object window
    // .navigator 
    // .clipboard
    // .writeText to clipboard function
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, chars, setPassword]);
  return (
    <>
      <div className='container mx-auto bg-slate-800 w-full max-wd-md shadow-md-rounded-lg px-4 my-20 py-10 text-white rounded-2xl '>
        <h1 className='text-4xl text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-2xl overflow-hidden mb-4 py-5'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3 text-sky-600 rounded-l-xl'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard}  className='hover:bg-blue-600 outline-none bg-blue-400 text-white px-3 py-0.5 shrink-0 rounded-r-xl'>
            Copy
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
              type='range'
              min={6}
              max={75}
              value={length}
              className='cursor-pointer'
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>
              Length : {length}
            </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={useNumbers}
              id="numberinput"
              onChange={() => {
                  useNumbers(prev=>!prev);
              }}
            />
            <label id='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={useChar}
              id="charinput"
              onChange={() => {
                  useChar(prev=>!prev);
              }}
            />
            <label id='charInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
