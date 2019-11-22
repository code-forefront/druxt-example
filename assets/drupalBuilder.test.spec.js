
import DruxtNode from '@/assets/helpers.js'
import drupalBuilderRewire from './drupalBuilder.js'
const mergeDrupalDataAndUiConfig = drupalBuilderRewire.__get__('mergeDrupalDataAndUiConfig')

test('the return value is a DruxtNode', async () => {
  expect(await mergeDrupalDataAndUiConfig('','')).toBeInstanceOf(DruxtNode);
})
test('merge of drupalContent and uiConfig for root node is done correctly', async () => {
  expect(await mergeDrupalDataAndUiConfig({
    "data": {
      "type": "node--article",
      "attributes": {
        "title": "Mon titre"
      }
    }
  },
  {
    "name": "basic-layer",
    "props": {
      "title": {
        "node": "/root",
        "attr": "title"
      }
    }
  }))
      .toEqual(
        {
          "name": "basic-layer", 
          "props": {
            "title": "Mon titre"
          }
        }
      );
})
test('merge of drupalContent and uiConfig for more complexe node is done correctly', async () => {
    expect(await mergeDrupalDataAndUiConfig({
      "data": {
        "type": "node--article",
        "attributes": {
          "title": "Mon titre"
        },
        "relationships": {
          "field_picture": {
            "type": "node--picture",
            "attributes": {
              "title": "Picture title"
            }
          },
          "field_quote": {
            "type": "node--quote",
            "attributes": {
              "text": "lorem ipsum"
            }
          }
        }
      }
    },
    {
      "name": "basic-layer",
      "props": {
        "title": {
          "node": "/root",
          "attr": "title"
        },
        "pictureTitle": {
          "node": "/root._rels.field_picture",
          "attr": "title"
        },
        "quote": {
          "node": "/root._rels.field_quote",
          "attr": "text"
        }
      }
    }))
        .toEqual(
          {
            "name": "basic-layer", 
            "props": {
              "title": "Mon titre",
              "pictureTitle": "Picture title",
              "quote": "lorem ipsum"
            }
          }
        );
})
test('reccursivity works fine', async () => {
  expect(await mergeDrupalDataAndUiConfig({
    'data': {
      'type': 'node--article',
      'relationships': {
        'field_author': {
          'type': 'node--author',
          'attributes': {
            'title': 'Author title'
          }
        }
      }
    }
  },
  {
    'name': 'basic-layer',
    'props': {
      'content': {
        'node': '/root._rels.field_author',
        'mount': [{
          'name': 'author',
          'condition': 'type=node--author',
          'props': {
            'title': {
              'node': '/root._rels.field_author',
              'attr': 'title'
            }
          }
        }]
      }
    }
  }))
      .toEqual(
        {
          'name': 'basic-layer',
          'props': {
            'content': {
              'name': 'author',
              'props': {
                'title': 'Author title'
              }
            }
          }
        }
      );
})