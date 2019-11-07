// eslint-disable-next-line
const getDrupalContent = async function (slug) {
  return {
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
        filed_author: {
          type: 'node--author',
          attributes: {
            title: 'Author title'
          }
        }
      }
    }
  }
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
      pictureTitle: {
        node: '/root._rels.field_picture',
        attr: 'title'
      },
      content: {
        node: '/root._rels.field_author',
        mount: [{
          name: 'author',
          condition: 'type=node--author',
          props: {
            title: {
              node: '/root._rels.field_author',
              attr: 'title'
            }
          }
        }]
      }
    }
  }
}
const mergeDrupalDataAndUiConfig = function (drupalContent, uiConfig) {
  return {
    name: 'basic-layer',
    props: {
      title: 'Mon titre',
      pictureTitle: 'Picture title',
      content: {
        name: 'author',
        props: {
          title: 'Author title'
        }
      }
    }
  }
}

export default async function (slug, uiConfigName) {
  const drupalContent = await getDrupalContent(slug)
  const uiConfig = await getUiConfig(uiConfigName)
  return mergeDrupalDataAndUiConfig(drupalContent, uiConfig)
}
