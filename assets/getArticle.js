
import axios from 'axios'
export default async function (lang, slugg) {
  const baseUrl = 'http://apis.code-forefront.com:2399'
  let langPath
  if (lang) {
    langPath = lang + '/'
  } else {
    langPath = ''
  }
  const translatePath = `${baseUrl}/${langPath}router/translate-path?path=articles/${slugg}`
  const articleUrl = (await axios.get(translatePath)).data.jsonapi.individual
  const article = (await axios.get(articleUrl)).data.data
  if (article) {
    return (article)
  } else {
    // throw new Error('article not found')
  }
}
