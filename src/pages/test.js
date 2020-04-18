import React, { useState } from 'react'
import * as Diff from 'diff'

const Timer = () => {
  const [input, setInput] = useState('')
  const [text, setText] = useState([])
  const [keyRecord, setKeyRecord] = useState(null)
  // const [count, setCount] = useState(0)

  const difference = Diff.diffChars('hom ay anh yeu ca bau troi', 'hom ay nah yeu cab au troi')

  const handleKeyDown = e => {
    console.log(e.key)
    setKeyRecord(e.key)
  }

  const handleChange = e => {
    const _input = e.target.value
    const lastInput = _input.slice(_input.length - 1, _input.length)
    if (lastInput === ' ') {
      setText([...text, e.target.value.trim()])
      setInput('')
    }
  }

  return (
    <div id='container' className='p-10 mx-auto tablet:p-0 tablet:mt-32'>
      <div className='p-4 mb-4 rounded bg-lightgray'>
        <div className='text-smoke'>
          {text.map((w, k) => (
            <span key={k}>{w} </span>
          ))}
          {difference.map((w, k) => (
            <span key={k} className={`text-granite ${w.added ? 'bg-light-red' : w.removed ? 'bg-mid-green' : 'bg-light-green'} rounded-sm`}>{w.value}</span>
          ))}
        </div>
        <div className='mb-4 text-left'>last key: {keyRecord}</div>
        <input
          type='text'
          className='w-full px-4 py-2 rounded'
          autoFocus={true}
          onChange={handleChange}
          value={input.trim()}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  )
}

export default Timer
