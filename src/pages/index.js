import { useState, useEffect } from 'react'
import { FiRefreshCcw as RefreshIcon } from 'react-icons/fi'
import wordsGenerator from '../helper'
import useInterval from '../hooks/useInterval'

const Home = () => {
  // global
  const [mode, setMode] = useState('count')
  const [lang, setLang] = useState('en')
  const [totalWords, setTotalWords] = useState(25)
  const [text, setText] = useState(wordsGenerator(lang, totalWords))
  const [finished, setFinished] = useState(false)

  // result
  const [stats, setStats] = useState({
    time: 0,
    correct: { words: 0, keys: 0 }
  })
  const [result, setResult] = useState({ wpm: 0, acc: 0 })

  // input
  const [userInput, setUserInput] = useState([])
  const [input, setInput] = useState('')
  const [currentWord, setCurrentWord] = useState(0)

  // word count mode
  const [startDate, setStartDate] = useState(null)

  // time count mode
  const [timeLeft, setTimeLeft] = useState(10)
  const [onCooldown, setCooldown] = useState(false)

  const getResult = () => {
    const words = stats.correct.words,
      keys = stats.correct.keys,
      time =
        mode === 'count'
          ? (new Date() - startDate) / 1000 / 60
          : (60 - timeLeft) / 60
    const totalKeys = text.reduce((s, w) => s + w.length + 1, -1)
    const acc =
      mode === 'count'
        ? Math.floor((keys / totalWords) * 100)
        : Math.floor((keys / totalKeys) * 100)
    setResult({ wpm: Math.floor(keys / (5 * time)), acc: acc })
  }

  useInterval(() => {
    if (!finished && startDate) getResult()
  }, 1000)

  useEffect(() => {
    if (mode === 'time') {
      let interval = null
      if (onCooldown) {
        interval = setInterval(() => {
          setTimeLeft(timeLeft - 1)
        }, 1000)
      } else if (!onCooldown) {
        clearInterval(interval)
      }
      if (timeLeft === 0) {
        clearInterval(interval)
        setCooldown(false)
        setFinished(true)
      }
      return () => clearInterval(interval)
    }
  }, [onCooldown, timeLeft])

  const handleKeyDown = e => {
    if (currentWord === 0 && e.target.value === '') {
      if (mode === 'count') setStartDate(new Date())
      if (mode === 'time' && !onCooldown) setCooldown(true)
    }

    if (e.key === ' ') {
      if (!finished) {
        if (e.target.value !== '') {
          if (mode === 'time') {
            // hide word!
          }
        }
        const lastWord = e.target.value.trim()
        const newUserInput = [...userInput, lastWord]
        setUserInput(newUserInput)
        const newStats = {
          ...newStats,
          correct: {
            words:
              stats.correct.words + (lastWord === text[currentWord] ? 1 : 0),
            keys:
              stats.correct.keys +
              (lastWord === text[currentWord]
                ? text[currentWord].length + 1
                : 0)
          }
        }
        setStats(newStats)
        setCurrentWord(currentWord + 1)
        if (currentWord + 1 === totalWords) {
          setFinished(true)
          setCooldown(false)
          const _newStats = {
            ...stats,
            time: (new Date() - startDate) / 1000 / 60
          }
          setStats(_newStats)
        }
      }
      setInput('')
    }
  }

  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <div id='container' className='p-10 mx-auto tablet:p-0 tablet:mt-32'>
      <div className='flex items-end justify-between mb-4'>
        <h2 className='text-2xl font-medium leading-normal'>typings app</h2>
        <div className='text-smoke'>{timeLeft}</div>
      </div>
      <div className='p-4 mb-4 rounded bg-lightgray'>
        <div className='px-1 mb-4 leading-relaxed break-words'>
          {text.map((t, i) => (
            <span
              className={
                currentWord === i
                  ? 'text-purple'
                  : i < currentWord
                  ? userInput[i] === t
                    ? 'text-green'
                    : 'text-orange'
                  : ''
              }
              key={i}
            >
              {t}{' '}
            </span>
          ))}
        </div>
        <div className='flex items-center justify-between'>
          <input
            type='text'
            className='w-full px-4 py-2 rounded'
            autoFocus={true}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={input.trim()}
          />
          <button
            className='w-8 ml-8'
            title='Reset'
            onClick={() => handleReset()}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <a
          className='block border-b-2 border-dashed cursor-pointer border-dirtysnow'
          title='Words on screen'
        >
          {totalWords}
        </a>
        <div>
          Result: WPM{' '}
          <span className='result anti-select'>
            {(result.wpm < 10 ? '0' : '') + result.wpm}
          </span>{' '}
          / ACC{' '}
          <span className='result anti-select'>
            {(result.acc < 10 ? '0' : '') + result.acc}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home
