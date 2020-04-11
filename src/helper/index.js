import english from '../dictionary/english'
import vietnamese from '../dictionary/vietnamese'

const wordsGenerator = (lang = 'en', take = 25) => {
  const dict = {
    en: english,
    vi: vietnamese
  }

  let result = []
  let length = result.length

  while (length < take) {
    const random = dict[lang][Math.floor(Math.random() * dict[lang].length)]
    const nwl = random.split(' ').length
    const _length = length + nwl
    if (_length <= take && (result[result.length - 1] !== random || result[result.length - 1] === undefined)) {
      length = _length
      if (nwl > 1) {
        random.split(' ').forEach(w => {
          result.push(w)
        })
      } else {
        result.push(random)
      }
    }
  }

  return result
}

export default wordsGenerator
