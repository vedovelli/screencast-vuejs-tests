
import { shallow } from '@vue/test-utils'
import App from './App'

describe('App', () => {
  test('é uma instância do Vue', () => {
    const wrapper = shallow(App)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
