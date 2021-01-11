import React from 'react'
import { mount } from 'enzyme'
import dayjs from 'dayjs'
import { DatePicker } from 'components'
import { selectCell } from './utils'
import { advanceTo } from 'jest-date-mock'

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = dayjs('2020-02-01')

describe('DatePicker[picker=`month`]', () => {
  beforeAll(() => advanceTo(0))
  afterAll(() => advanceTo(0))

  it('should render correctly', () => {
    const wrapper = mount(
      <DatePicker
        picker="month"
        open
        placeholder="placeholder"
        defaultPickerValue={defaultValue}
      />,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('the alias should work correctly', () => {
    const { MonthPicker } = DatePicker
    const wrapper = mount(
      <MonthPicker open placeholder="placeholder" defaultPickerValue={defaultValue} />,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultValue` should works', () => {
    const date = dayjs('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(<DatePicker picker="month" open defaultValue={date} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `defaultPickerValue` should works', () => {
    const date = dayjs('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(<DatePicker picker="month" open defaultPickerValue={date} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `format` should works', () => {
    const wrapper = mount(
      <DatePicker picker="month" open format="YY-MM" defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 'May')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const date = dayjs('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(
      <DatePicker picker="month" open value={date} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker picker="month" open onChange={callback} defaultPickerValue={defaultValue} />,
    )
    selectCell(wrapper, 'May')
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
