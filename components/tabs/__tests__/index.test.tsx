import React from 'react'
import { mount } from 'enzyme'
import { Tabs } from 'components'
import { nativeEvent } from 'tests/utils'

describe('Tabs', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Tabs>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work correctly with different styles', () => {
    const wrapper = mount(
      <Tabs>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
      </Tabs>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger events when tab changed', () => {
    let value = ''
    const changeHandler = jest.fn().mockImplementation(val => (value = val))
    const wrapper = mount(
      <Tabs initialValue="1" onChange={changeHandler}>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )

    wrapper.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    expect(changeHandler).toHaveBeenCalled()
    expect(value).toBe('2')
  })

  it('should ignore events when tab disabled', () => {
    const changeHandler = jest.fn()
    const wrapper = mount(
      <Tabs initialValue="1" onChange={changeHandler}>
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2" disabled>
          2
        </Tabs.Item>
      </Tabs>,
    )

    wrapper.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    expect(changeHandler).not.toHaveBeenCalled()
  })
})
