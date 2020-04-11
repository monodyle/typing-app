import React from 'react'
import PropTypes from 'prop-types'

export default function useInterval (callback, delay) {
  const savedCallback = React.useRef()

  React.useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  React.useEffect(() => {
    function tick () {
      savedCallback.current()
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

useInterval.propTypes = {
  callback: PropTypes.func.isRequired,
  delay: PropTypes.number.isRequired
}
