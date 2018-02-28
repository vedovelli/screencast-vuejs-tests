
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import EventBus from '@/plugins/event-bus'
import { shallow } from '@vue/test-utils'

Vue.use(EventBus)
Vue.use(Vuelidate)

import Signin from './sign-in'

describe('Signin', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(Signin)
  })

  test('Verifica o estado da propriedade username no validation model quando input é preenchido', () => {
    setData(wrapper)
    const field = wrapper.find('#sign-in-user')
    field.trigger('input')
    expect(wrapper.vm.$v.username.$dirty).toBeTruthy()
    resetData(wrapper)
  })

  test('Todas as propriedades e ferramentas voltam ao estado inicial quando reset() for executado', () => {
    const { username, email, password } = wrapper.vm.$data

    setData(wrapper)
    resetData(wrapper)

    expect(username).toBe('')
    expect(email).toBe('')
    expect(password).toBe('')
    expect(wrapper.vm.$v.$invalid).toBeTruthy()
  })

  test('As propriedades corretas estão presentes no estado do componente', () => {
    const expected = ['username', 'email', 'password', 'keepSignedIn']
    const received = Object.keys(wrapper.vm.$data)
    expect(expected).toEqual(received)
  })

  test('O evento do-sign-in é disparado quando o vm.submit() é executado', () => {
    setData(wrapper)
    wrapper.vm.submit()
    const data = wrapper.emitted('do-sign-in')[0][0]
    expect(data).toEqual({
      email: 'vedovelli@gmail.com',
      username: 'vedovelli',
      password: 123456,
      keepSignedIn: true
    })
  })

  test('Se o estado do validation model é $invalid == false quando todos os campos obrigatórios forem preenchidos', () => {
    setData(wrapper)
    expect(wrapper.vm.$v.$invalid).toBeFalsy()
  })

  test('Se o estado do validation model é inicialmente $invalid == true', () => {
    resetData(wrapper)
    expect(wrapper.vm.$v.$invalid).toBeTruthy()
  })

  test('Componente é uma instância do Vue', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  const setData = wrapper => wrapper.setData({
    username: 'vedovelli',
    email: 'vedovelli@gmail.com',
    password: 123456
  })

  const resetData = wrapper => wrapper.setData({
    username: '',
    email: '',
    password: ''
  })
})
