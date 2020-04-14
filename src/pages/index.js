import { useState, useEffect } from 'react'
import { FiRefreshCcw as RefreshIcon } from 'react-icons/fi'
import wordsGenerator from '../helper'
import useInterval from '../hooks/useInterval'
import Setting from '../components/setting'

const MAX_WORDS = 3200
const avaiableKeys = ["'", ',', '.', ';']

const Home = () => {
  // global
  const [mode, setMode] = useState('count')
  const [lang, setLang] = useState('en')
  const [totalWords, setTotalWords] = useState(25)
  const [userText, setUserText] = useState('')
  const [text, setText] = useState(
    wordsGenerator({ lang: lang, take: totalWords })
  )
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
    const correctKeys = stats.correct.keys,
      words = correctKeys / 5,
      time =
        mode === 'count'
          ? (new Date() - startDate) / 1000 / 60
          : 1 - timeLeft / 60
    let totalKeys = -1
    if (mode === 'count') {
      for (const w of text) totalKeys += w.length + 1
    } else {
      for (const i in userInput) totalKeys += text[i].length + 1
    }
    const acc = Math.floor((correctKeys / totalKeys) * 100)
    setResult({
      wpm: Math.floor(words / time),
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
    if (lang !== 'own')
      setText(wordsGenerator({ lang: lang, take: totalWords }))
  }, [totalWords])

  useEffect(() => {
    if (lang === 'own') setText(userText.split(' ').filter(w => w !== ''))
  }, [userText])

  const handleReset = () => {
    const _text =
      lang === 'own'
        ? userText.split(' ').filter(w => w !== '')
        : wordsGenerator({ lang: lang, take: totalWords })
    setText(_text)
    if (lang === 'own') setTotalWords(_text.length)
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
    const _input = e.target.value
    const lastChar = _input.slice(_input.length - 1, _input.length)
    if (
      currentWord === 0 &&
      _input.length === 1 &&
      ((lastChar >= 'a' && lastChar <= 'z') ||
        avaiableKeys.some(k => k === lastChar))
    ) {
      console.log('Start!')
      setStartDate(new Date())
      if (mode === 'time' && !onCooldown) setCooldown(true)
    }

    if (lastChar !== ' ') {
      setInput(_input)
    } else {
      if (_input.trim() !== '' && !finished) {
        const inputWord = _input.trim()
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

        getResult()
      }
      setInput('')
    }
  }

  const onUserParagraph = e => {
    const value = e.target.value.toLowerCase()
    const pattern = new RegExp('[^a-zA-Z0-9 -.,]', 'g')
    setUserText(value.replace(pattern, '').trim())
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

      {/* Setting */}
      <Setting
        MAX_WORDS={MAX_WORDS}
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
        lang={lang}
        setLang={setLang}
        mode={mode}
        setMode={setMode}
        totalWords={totalWords}
        setTotalWords={setTotalWords}
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        userText={userText}
        onUserParagraph={onUserParagraph}
        handleReset={handleReset}
      />
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
