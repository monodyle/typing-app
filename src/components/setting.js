const Setting = ({
  MAX_WORDS,
  openSetting,
  setOpenSetting,
  lang,
  setLang,
  mode,
  setMode,
  totalWords,
  setTotalWords,
  timeLeft,
  setTimeLeft,
  userText,
  onUserParagraph,
  handleReset
}) => {
  return (
    <div
      id='setting'
      className={`${openSetting ? 'block' : 'hidden'} floating`}
    >
      <div className='container p-8 rounded bg-lightgray'>
        <h2 className='mb-4 text-2xl font-medium leading-normal'>settings</h2>
        <div className='mb-6'>
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
            <a
              className={`inline-block px-1 ml-4 cursor-pointer ${
                lang === 'own' ? 'border-b-2 border-dashed' : 'text-smoke'
              }`}
              onClick={() => setLang('own') && setText('')}
            >
              own paragraph
            </a>
          </div>
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
          {mode === 'count' && lang !== 'own' && (
            <div>
              <div className='mb-3'>
                <span className='text-granite'>word length:</span>
                {[10, 25, 50, 100, 250].map((i, k) => (
                  <span key={k}>
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
                  </span>
                ))}
              </div>
            </div>
          )}
          {mode === 'time' && (
            <div>
              <div className='mb-3'>
                <span className='text-granite'>duration:</span>
                {[15, 30, 60, 120, 240].map((i, k) => (
                  <span key={k}>
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
                  </span>
                ))}
              </div>
            </div>
          )}
          {lang === 'own' && (
            <div className='mb-3'>
              <span className='block mb-3 text-granite'>your paragraph</span>
              <textarea
                className='w-full h-32 p-4 text-base rounded border-smoke'
                style={{ resize: 'none' }}
                onChange={e => onUserParagraph(e)}
                value={userText}
              />
            </div>
          )}
        </div>
        <div className='mb-6 text-center'>
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
  )
}

export default Setting
