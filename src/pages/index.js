import { useState, useEffect } from 'react'
import { FiRefreshCcw as RefreshIcon } from 'react-icons/fi'
import wordsGenerator from '../helper'
import useInterval from '../hooks/useInterval'

const MAX_WORDS = 3200

const Home = () => {
  // global
  const [mode, setMode] = useState('count')
  const [lang, setLang] = useState('en')
  const [totalWords, setTotalWords] = useState(25)
  const [text, setText] = useState(wordsGenerator(lang, totalWords))
  const [finished, setFinished] = useState(false)

  const [openSetting, setOpenSetting] = useState(false)

  // result
  const [stats, setStats] = useState({
    time: 0,
    correct: { words: 0, keys: 0 }
  })
  const resetStats = () => {
    setStats({
      time: 0,
      correct: { words: 0, keys: 0 }
    })
  }
  const [result, setResult] = useState({ wpm: 0, acc: 0 })
  const resetResult = () => {
    setResult({ wpm: 0, acc: 0 })
  }

  // input
  const [userInput, setUserInput] = useState([])
  const [input, setInput] = useState('')
  const [currentWord, setCurrentWord] = useState(0)

  // word count mode
  const [startDate, setStartDate] = useState(null)

  // time count mode
  const [timeLeft, setTimeLeft] = useState(60)
  const [onCooldown, setCooldown] = useState(false)

  const getResult = () => {
    const keys = stats.correct.keys,
      time =
        mode === 'count'
          ? (new Date() - startDate) / 1000 / 60
          : (60 - timeLeft) / 60
    let totalKeys = -1
    for (const i in userInput) totalKeys += text[i].length + 1
    console.log(totalKeys)
    const acc = Math.floor(
      (keys / (mode === 'count') ? totalWords : totalKeys) * 100
    )
    setResult({
      wpm: Math.floor(keys / (5 * time)),
      acc: mode === 'count' ? acc : Math.min(100, acc)
    })
  }

  useInterval(() => {
    if (!finished && (startDate || onCooldown)) getResult()
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

  useEffect(() => {
    setText(wordsGenerator(lang, totalWords))
  }, [totalWords])

  const handleKeyDown = e => {
    if (currentWord === 0 && e.target.value === '') {
      if (mode === 'count') setStartDate(new Date())
      if (mode === 'time' && !onCooldown) setCooldown(true)
    }

    if (e.key === ' ' && e.target.value.trim() !== '') {
      if (!finished) {
        const inputWord = e.target.value.trim()
        const trueWord = text[currentWord]
        const newUserInput = [...userInput, inputWord]
        setUserInput(newUserInput)
        let newStats
        if (inputWord === trueWord) {
          newStats = {
            ...stats,
            correct: {
              words: stats.correct.words + 1,
              keys: stats.correct.keys + trueWord.length + 1
            }
          }
        } else {
          let correct = 0
          const len = Math.min(trueWord.length, inputWord.length)
          const base = trueWord.length === len ? trueWord : inputWord
          for (const i in base) correct += trueWord[i] === inputWord[i] ? 1 : 0
          newStats = {
            ...stats,
            correct: {
              words: stats.correct.words,
              keys: stats.correct.keys + correct
            }
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

  const handleReset = () => {
    setText(wordsGenerator(lang, totalWords))
    setFinished(false)
    resetStats()
    resetResult()
    setUserInput([])
    setInput('')
    setCurrentWord(0)
    setTimeLeft(timeLeft)
    setStartDate(null)
    setCooldown(false)
  }

  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <div id='container' className='p-10 mx-auto tablet:p-0 tablet:mt-32'>
      <div className='flex items-end justify-between mb-4'>
        <h2 className='text-2xl font-medium leading-normal'>typings app</h2>
        <a
          className='block cursor-pointer text-smoke'
          title={mode === 'count' ? 'words on screen' : 'time remaining...'}
        >
          {mode === 'count' ? totalWords + 'w' : timeLeft + 's'}
        </a>
      </div>
      <div className='p-4 mb-4 rounded bg-lightgray'>
        <div
          className={`px-1 mb-4 leading-relaxed break-words ${
            mode === 'time' || (mode === 'count' && text.length === MAX_WORDS)
              ? 'time-mode'
              : ''
          }`}
        >
          {text.map((t, i) => (
            <span
              className={
                currentWord === i
                  ? 'text-purple'
                  : i < currentWord
                  ? mode === 'time'
                    ? 'hidden'
                    : userInput[i] === t
                    ? 'text-green'
                    : 'text-orange'
                  : 'text-smoke'
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
            title='reset'
            onClick={() => handleReset()}
          >
            <RefreshIcon />
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <a
          className='block border-b-2 border-dashed cursor-pointer border-dirtysnow'
          title='open setting'
          onClick={() => setOpenSetting(true)}
        >
          settings
        </a>
        <div>
          Result: WPM{' '}
          <span className={`result anti-select ${!finished ? 'hide' : ''}`}>
            {(result.wpm < 10 ? '0' : '') + result.wpm}
          </span>{' '}
          / ACC{' '}
          <span className={`result anti-select ${!finished ? 'hide' : ''}`}>
            {(result.acc < 10 ? '0' : '') + result.acc}
          </span>
        </div>
      </div>
      <div className='tablet:pb-32'></div>
      <div id='setting' className={openSetting ? 'block' : 'hidden'}>
        <div className='container p-8 rounded bg-lightgray'>
          <h2 className='mb-4 text-2xl font-medium leading-normal'>settings</h2>
          <div className='mb-3'>
            <span className='text-granite'>language</span>
            <a
              className={`inline-block px-1 ml-4 cursor-pointer ${
                lang === 'en' ? 'border-b-2 border-dashed' : 'text-smoke'
              }`}
              onClick={() => setLang('en')}
            >
              english
            </a>
            <a
              className={`inline-block px-1 ml-4 cursor-pointer ${
                lang === 'vi' ? 'border-b-2 border-dashed' : 'text-smoke'
              }`}
              onClick={() => setLang('vi')}
            >
              vietnamese
            </a>
          </div>
          <div className='mb-6'>
            <div className='mb-3'>
              <span className='text-granite'>testing mode:</span>
              <a
                className={`inline-block px-1 ml-4 cursor-pointer ${
                  mode === 'count' ? 'border-b-2 border-dashed' : 'text-smoke'
                }`}
                onClick={() => {
                  setMode('count')
                  setTotalWords(25)
                }}
              >
                words count
              </a>
              <a
                className={`inline-block px-1 ml-4 cursor-pointer ${
                  mode === 'time' ? 'border-b-2 border-dashed' : 'text-smoke'
                }`}
                onClick={() => {
                  setMode('time')
                  setTotalWords(MAX_WORDS)
                }}
              >
                timing
              </a>
            </div>
            {mode === 'count' && (
              <div>
                <div className='mb-3'>
                  <span className='text-granite'>word length:</span>
                  {[10, 25, 50, 100, 250].map((i, k) => (
                    <>
                      {i === 10 ? '' : '/'}
                      <a
                        className={`inline-block px-1 ml-2 mr-2 cursor-pointer ${
                          totalWords === i
                            ? 'border-b-2 border-dashed'
                            : 'text-smoke'
                        }`}
                        onClick={() => setTotalWords(i)}
                      >
                        {i}
                      </a>
                    </>
                  ))}
                </div>
              </div>
            )}
            {mode === 'time' && (
              <div>
                <div className='mb-3'>
                  <span className='text-granite'>duration:</span>
                  {[15, 30, 60, 120, 240].map((i, k) => (
                    <>
                      {i === 15 ? '' : '/'}
                      <a
                        className={`inline-block px-1 ml-2 mr-2 cursor-pointer ${
                          timeLeft === i
                            ? 'border-b-2 border-dashed'
                            : 'text-smoke'
                        }`}
                        onClick={() => setTimeLeft(i)}
                      >
                        {i}
                      </a>
                    </>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='text-center'>
            <a
              className='inline-block px-4 py-2 font-medium rounded cursor-pointer bg-dirtysnow hover:bg-carbon'
              onClick={() => {
                setOpenSetting(false)
                handleReset()
              }}
            >
              apply
            </a>
          </div>
        </div>
      </div>
      <div className='pb-10 text-center'>
        <a
          className='border-b-2 border-dashed border-dirtysnow text-smoke'
          href='https://github.com/monodyle/typings-app/issues'
          target='blank'
        >
          report bugs
        </a>
      </div>
    </div>
  )
}

export default Home
