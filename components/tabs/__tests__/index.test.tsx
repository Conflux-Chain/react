import React, { useEffect, useState } from 'react'
import { nativeEvent } from 'tests/utils'
import { mount, ReactWrapper } from 'enzyme'
import { nav } from '../tabs-nav'
import { reduceStatus, defaultGetColor } from '../util'
import { Tabs } from 'components'
import { palette } from '../../styles/themes/default'

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
    wrapper.find('header').find('.nav').at(1).simulate('mouseEnter', nativeEvent)
    expect(wrapper.find('header').find('.label').at(1).get(0).props.style).toHaveProperty(
      'color',
      '#0054fe',
    )
    wrapper.find('header').find('.nav').at(1).simulate('mouseLeave', nativeEvent)
    expect(wrapper.find('header').find('.label').at(1).get(0).props.style).toHaveProperty(
      'color',
      '#444',
    )
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
    const label = (wrapper.find('header').find('.label').at(0).props().children as Array<any>)[0]
    expect(label).toBe('label11')
    wrapper.unmount()
  })

  it('can be controlled', () => {
    const controlled = mount(
      <Tabs value="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    const uncontrolled = mount(
      <Tabs initialValue="1">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2">
          2
        </Tabs.Item>
      </Tabs>,
    )
    // const a = wrapper.find(Tabs.Item).at(0).html()
    uncontrolled.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    controlled.find('header').find('.tab').at(1).simulate('click', nativeEvent)
    const getActiveLabel = (wrapper: ReactWrapper) =>
      wrapper
        .find('header')
        .findWhere(n => n.hasClass('active'))
        .find('.label')
        .childAt(0)
        .html()
    expect(getActiveLabel(uncontrolled)).toBe('label2')
    expect(getActiveLabel(controlled)).toBe('label1')
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

  it('should return default nav', () => {
    expect(() => nav({})).not.toThrow()
  })

  it('should be able to update tab-item props', () => {
    function App() {
      const [label1, setLabel1] = useState('label1')
      useEffect(() => {
        setLabel1('label11')
      }, [])
      return (
        <Tabs value="1" showDivider={true}>
          <Tabs.Item label={label1} value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2" disabled>
            2
          </Tabs.Item>
        </Tabs>
      )
    }
    const wrapper = mount(<App />)
    const label = wrapper
      .find('header')
      .findWhere(n => n.hasClass('active'))
      .find('.label')
      .childAt(0)
      .html()
    expect(label).toBe('label11')
  })
})

describe('useImperative', () => {
  it('should work with useImperative', () => {
    const { useTabsHandle } = Tabs
    function App() {
      const { ref, setCurrentTab, getCurrentTab } = useTabsHandle()
      useEffect(() => {
        getCurrentTab()
        setCurrentTab('2')
      }, [])
      return (
        <Tabs ref={ref}>
          <Tabs.Item label="label1" value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2" disabled>
            2
          </Tabs.Item>
        </Tabs>
      )
    }

    const wrapper = mount(<App />)
    const label = wrapper
      .find('header')
      .findWhere(n => n.hasClass('active'))
      .find('.label')
      .childAt(0)
      .html()
    expect(label).toBe('label2')
  })
})

describe('utils', () => {
  it('should cover a unreachable brach due to a ts bug', () => {
    reduceStatus({})
  })

  it('should return corrent colors with virant and status combination', () => {
    const status = ['disabled', 'active', 'hover', 'default']
    const varients = ['line', 'solid']
    const colors: string[] = []
    status.forEach(s => {
      varients.forEach(v => {
        colors.push(defaultGetColor(palette, v, s))
      })
    })
    expect(colors).toMatchSnapshot()
  })
})
