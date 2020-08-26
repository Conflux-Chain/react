import { Input, useImperativeInput } from 'components'
import { mount } from 'enzyme'
import React, { useEffect } from 'react'

describe('UseImperativeInput', () => {
  it.only('should follow change with use-imperative-input', () => {
    let log = ''
    jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
    const MockInput: React.FC<{
      defaultValue?: string
      testSetValue?: boolean
      testSetEmptyValue?: boolean
      testFocus?: boolean
      testBlur?: boolean
    }> = ({ defaultValue, testSetValue, testSetEmptyValue, testFocus, testBlur }) => {
      const { ref, setValue, getValue, focus, blur } = useImperativeInput<HTMLInputElement>()
      useEffect(() => {
        testSetValue && setValue('test set value')
      }, [testSetValue])
      useEffect(() => {
        testSetEmptyValue && setValue()
      }, [testSetEmptyValue])
      useEffect(() => {
        testFocus && focus()
      }, [testFocus])
      useEffect(() => {
        testBlur && blur()
      }, [testBlur])
      useEffect(() => {
        console.log(getValue())
      }, [defaultValue, testSetValue])
      return <Input ref={ref} defaultValue={defaultValue} />
    }

    const wrapper = mount(<MockInput />)

    wrapper.setProps({ defaultValue: 'default' })
    const input = wrapper.find('input').at(0).getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('default')
    expect(log).toEqual('default')
    log = ''

    wrapper.setProps({ testSetValue: true })
    expect(input.value).toEqual('test set value')
    expect(log).toEqual('test set value')
    log = ''

    wrapper.setProps({ testSetEmptyValue: true })
    expect(input.value).toEqual('')
    expect(log).toEqual('')

    wrapper.setProps({ testFocus: true })
    // expect(wrapper.find('div.input-wrapper.focus').length).toEqual(1)
    wrapper.setProps({ testBlur: true })
    // expect(wrapper.find('div.input-wrapper.focus').length).toEqual(0)
  })
})
