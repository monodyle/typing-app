import * as Diff from 'diff'

const StaticsBoard = ({
  setOpenStatics,
  openStatics,
  text,
  userInput,
  stats,
  result
}) => {
  return (
    <div className={`${openStatics ? 'block' : 'hidden'} floating`}>
      <div className='container p-8 rounded bg-lightgray'>
        <h2 className='mb-4 text-2xl font-medium leading-normal'>statics</h2>
        <div className='mb-6'>
          <div className='mb-3 leading-relaxed break-words'>
            {text.map((w, i) => {
              w !== userInput[i] &&
                Diff.diffChars(w, userInput[i]).map((input, k) => (
                  <span className='mr-2 bg-light-green' key={k}>
                    <span
                      className={`text-granite ${
                        input.added
                          ? 'bg-light-red'
                          : input.removed
                          ? 'bg-mid-green'
                          : 'bg-light-green'
                      } rounded-sm`}
                    >
                      {input.value}
                    </span>
                  </span>
                ))
            })}
          </div>
          <div className='mb-3'>
            <span className='mr-2 text-granite'>total keys you typed:</span>
            <span className='text-red'>{stats.correct.keys}</span>
          </div>
          <div className='mb-3'>
            <span className='mr-2 text-granite'>words per min:</span>
            <span className='text-red'>{result.wpm}</span>
          </div>
          <div className='mb-3'>
            <span className='mr-2 text-granite'>accuracy:</span>
            <span className='text-red'>{result.acc}</span>
          </div>
        </div>
        <div className='mb-6 text-center'>
          <a
            className='inline-block px-4 py-2 font-medium rounded cursor-pointer bg-dirtysnow hover:bg-carbon'
            onClick={() => {
              setOpenStatics(false)
            }}
          >
            got it
          </a>
        </div>
      </div>
    </div>
  )
}

export default StaticsBoard
