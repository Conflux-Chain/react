import React, { useRef, useEffect, useState } from 'react'
import { mount } from 'enzyme'
import { Tabs } from 'components'
import { nativeEvent } from 'tests/utils'
import { TabHandles } from '../tabs'

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

  it('should change style when hover header', () => {
    const wrapper = mount(
      <Tabs initialValue="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    wrapper.find('header').find('.label').at(1).simulate('mouseEnter', nativeEvent)
    expect(wrapper.find('header').find('.label').at(1).get(0).props.style).toHaveProperty(
      'color',
      '#0054fe',
    )
    wrapper.find('header').find('.label').at(1).simulate('mouseLeave', nativeEvent)
    expect(wrapper.find('header').find('.label').at(1).get(0).props.style).toHaveProperty(
      'color',
      '#444',
    )
  })

  it('can use ref as a imperative handle', () => {
    function App() {
      const ref = useRef<TabHandles>(null)
      useEffect(() => {
        if (ref.current) {
          ref.current.currentTab('2')
        }
      }, [])
      return (
        <Tabs ref={ref} initialValue="1">
          <Tabs.Item label="label1" value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2">
            2
          </Tabs.Item>
        </Tabs>
      )
    }
    mount(<App />)
  })

  it('can set tabs dynamically', () => {
    function App() {
      const [items, setItems] = useState([
        { label: 'label1', value: '1' },
        { label: 'label2', value: '2' },
      ])
      useEffect(() => {
        setItems([{ label: 'label11', value: '1' }])
      }, [])
      return (
        <Tabs initialValue="1">
          {items.map(({ label, value }) => {
            return (
              <Tabs.Item key={value} label={label} value={value}>
                {label}
              </Tabs.Item>
            )
          })}
        </Tabs>
      )
    }
    const wrapper = mount(<App />)
    wrapper.unmount()
  })

  it('can be controlled', () => {
    mount(
      <Tabs value="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2" disabled>
          2
        </Tabs.Item>
      </Tabs>,
    )
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
