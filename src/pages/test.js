import React, { useState } from 'react'

const Timer = () => {
  const [input, setInput] = useState('')
  const [text, setText] = useState([])
  const [count, setCount] = useState(0)

  const handleChange = e => {
    const _input = e.target.value
    const lastInput = _input.slice(_input.length - 1, _input.length)
    if (lastInput !== ' ') {
      setInput(_input)
    } else {
      setCount(count + 1)
      setText([...text, e.target.value.trim()])
      setInput('')
    }
  }

  return (
    <div id='container' className='p-10 mx-auto tablet:p-0 tablet:mt-32'>
      <div className='p-4 mb-4 rounded bg-lightgray'>
        <div className="text-smoke">{text.map((w, k) => (
          <span key={k}>{w} </span>
        ))}</div>
        <div className='mb-4 text-left'>spaces: {count}</div>
        <input
          type='text'
          className='w-full px-4 py-2 rounded'
          autoFocus={true}
          onChange={handleChange}
          value={input.trim()}
        />
      </div>
    </div>
  )
}

export default Timer
