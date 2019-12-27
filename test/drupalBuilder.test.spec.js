
import _ from 'lodash'
import TestingData from './TestingData.json'
import DruxtNode from '@/assets/helpers.js'
import drupalBuilderRewire from '@/assets/drupalBuilder.js'
const mergeDrupalDataAndUiConfig = drupalBuilderRewire.__get__('mergeDrupalDataAndUiConfig')

test('the return value is a DruxtNode', async () => {
  expect(await mergeDrupalDataAndUiConfig('', '')).toBeInstanceOf(DruxtNode)
})
_.forEach(TestingData, function (data) {
  test(data.testName, async () => {
    expect(await mergeDrupalDataAndUiConfig(data.drupalContent, data.uiConfig)).toEqual(data.testResult)
  })
})
