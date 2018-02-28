
import { shallow } from '@vue/test-utils'
import Signin from './sign-in'

describe('Signin', () => {
  test('Componente é uma instância do Vue', () => {
    const wrapper = shallow(Signin)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
