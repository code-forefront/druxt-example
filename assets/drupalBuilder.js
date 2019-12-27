import _ from 'lodash'
import DruxtNode from '@/assets/helpers.js'
import getArticle from '@/assets/getArticle.js'

// eslint-disable-next-line
const getDrupalContent = async function (lang, slugg) {
  const data = await getArticle(lang, slugg)
  return {
    data
  }
  /* return {
    data: {
      type: 'node--article',
      attributes: {
        title: 'Mon titre'
      },
      relationships: {
        field_picture: {
          type: 'node--picture',
          attributes: {
            title: 'Picture title'
          }
        },
        field_author: {
          type: 'node--author',
          attributes: {
            title: 'Author title'
          }
        }
      }
    }
  } */
}

// eslint-disable-next-line
const getUiConfig = async function (uiConfigName) {
  return {
    name: 'basic-layer',
    props: {
      title: {
        node: '/root',
        attr: 'title'
      },
      body: {
        node: '/root',
        attr: 'body'
      }
    }
  }
}
const getAttributes = function (path, tree) {
  const nodes = path.split('.')
  let newTree = tree
  _.forEach(nodes, function (node) {
    switch (node) {
      case '/root':
        node = 'data'
        break
      case '_rels':
        node = 'relationships'
        break
    }
    newTree = newTree[node]
  })
  return newTree
}
const mergeDrupalDataAndUiConfig = function (drupalContent, uiConfig) {
  const compName = uiConfig.name
  const props = {}
  _.forEach(uiConfig.props, function (value, key) {
    const node = value.node
    if (value.mount) {
      _.forEach(value.mount, function (val) {
        props[key] = mergeDrupalDataAndUiConfig(drupalContent, val)
      })
    } else {
      const contentVal = getAttributes(node, drupalContent)
      const attribute = value.attr
      props[key] = contentVal.attributes[attribute]
    }
  })
  return new DruxtNode(compName, props)
}

export default async function (lang, slugg, uiConfigName) {
  const drupalContent = await getDrupalContent(lang, slugg)
  const uiConfig = await getUiConfig(uiConfigName)
  return mergeDrupalDataAndUiConfig(drupalContent, uiConfig)
}
