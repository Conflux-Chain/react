import React, { useEffect, useState } from 'react'
import { nativeEvent } from 'tests/utils'
import { mount } from 'enzyme'
import { nav } from '../tabs-nav'
import { useFixedWidth } from '../tabs-label'
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

  it('should return default nav', () => {
    nav({})
  })

  it('should ingnore click in uncontroled component', () => {
    const wrapper = mount(
      <Tabs initialValue="1" value="2" showDivider={true} varient="solid">
        <Tabs.Item label="label1" value="1">
          1
        </Tabs.Item>
        <Tabs.Item label="label2" value="2" disabled>
          2
        </Tabs.Item>
      </Tabs>,
    )
    wrapper.find('header').find('.tab').at(0).simulate('click', nativeEvent)
  })
  it('should be able to update tab-item props', () => {
    function App() {
      const [label1, setLabel1] = useState('label1')
      useEffect(() => {
        setLabel1('label11')
      }, [])
      return (
        <Tabs initialValue="1" value="2" showDivider={true}>
          <Tabs.Item label={label1} value="1">
            1
          </Tabs.Item>
          <Tabs.Item label="label2" value="2" disabled>
            2
          </Tabs.Item>
        </Tabs>
      )
    }
    mount(<App />)
  })
})

describe('useImperative', () => {
  it('should work with useImperative', () => {
    const { useImperative } = Tabs
    function App() {
      const { ref, currentTab } = useImperative()
      useEffect(() => {
        currentTab()
        currentTab('2')
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

    mount(<App />)
  })
})

describe('utils', () => {
  it('should cover a unreachable brach due to a ts bug', () => {
    reduceStatus({})
  })

  it('should return corrent colors with virant and status combination', () => {
    const status = ['disabled', 'active', 'hover', 'default']
    const varients = ['line', 'solid']
    status.forEach(s => {
      varients.forEach(v => {
        defaultGetColor(palette, v, s)
      })
    })
  })
})

describe('useFixedWidth', () => {
  it('should work on a null component', () => {
    function App() {
      const [width, ref] = useFixedWidth<HTMLDivElement>(null)
      return <div>{false && <div ref={ref}></div>}</div>
    }
    mount(<App />)
  })
})
