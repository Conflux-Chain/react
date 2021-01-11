import React, { useEffect } from 'react'
import { mount } from 'enzyme'
import dayjs from 'dayjs'
import { DatePicker } from 'components'
import { Wifi } from '@zeit-ui/react-icons'
import { clearInput, nextMonth, nextYear, openPicker, selectCell } from './utils'
import { act } from 'react-dom/test-utils'
import { useDatePickerHandle } from '../index'
import { advanceTo } from 'jest-date-mock'

// ensure that the snapshots does not mismatch due to the changes of test date
const defaultValue = dayjs('2020-08-01 12:00:00')

describe('DatePicker Common', () => {
  beforeAll(() => advanceTo(0))
  afterAll(() => advanceTo(0))

  it('should render correctly', () => {
    const wrapper = mount(
      <DatePicker open placeholder="placeholder" defaultPickerValue={defaultValue} />,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correct placeholder', () => {
    const wrapper = mount(<DatePicker placeholder={undefined} defaultPickerValue={defaultValue} />)
    expect(wrapper.find('input').props().placeholder).toEqual('Select date')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all variants', () => {
    const wrapper = mount(
      <div>
        <DatePicker open variant="solid" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all colors', () => {
    const wrapper = mount(
      <div>
        <DatePicker open color="primary" defaultPickerValue={defaultValue} />
        <DatePicker open color="success" defaultPickerValue={defaultValue} />
        <DatePicker open color="warning" defaultPickerValue={defaultValue} />
        <DatePicker open color="error" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support all sizes', () => {
    const wrapper = mount(
      <div>
        <DatePicker open size="mini" defaultPickerValue={defaultValue} />
        <DatePicker open size="small" defaultPickerValue={defaultValue} />
        <DatePicker open size="medium" defaultPickerValue={defaultValue} />
        <DatePicker open size="large" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open locale="zh-CN" defaultPickerValue={defaultValue} />
        <DatePicker open picker="year" locale="zh-CN" defaultPickerValue={defaultValue} />
        <DatePicker open picker="quarter" locale="zh-CN" defaultPickerValue={defaultValue} />
        <DatePicker open picker="month" locale="zh-CN" defaultPickerValue={defaultValue} />
        <DatePicker open picker="week" locale="zh-CN" defaultPickerValue={defaultValue} />
        <DatePicker open picker="time" locale="zh-CN" defaultPickerValue={defaultValue} />
        <DatePicker open locale="en-US" defaultPickerValue={defaultValue} />
        <DatePicker open picker="year" locale="en-US" defaultPickerValue={defaultValue} />
        <DatePicker open picker="quarter" locale="en-US" defaultPickerValue={defaultValue} />
        <DatePicker open picker="month" locale="en-US" defaultPickerValue={defaultValue} />
        <DatePicker open picker="week" locale="en-US" defaultPickerValue={defaultValue} />
        <DatePicker open picker="time" locale="en-US" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `locale` should works with compatibility', () => {
    const wrapper = mount(
      <div>
        <DatePicker open locale="zh" defaultPickerValue={defaultValue} />
        <DatePicker open locale="en_US" defaultPickerValue={defaultValue} />
        <DatePicker open locale="en" defaultPickerValue={defaultValue} />
        <DatePicker open locale="xxx" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `value` should works', () => {
    const date = dayjs('2020-01-01', 'YYYY-MM-DD')
    const wrapper = mount(<DatePicker open value={date} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `className` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(
      <DatePicker open className={customClass} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.find('.cfx-picker').hasClass(customClass)).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dateRender` should works', () => {
    const wrapper = mount(
      <DatePicker
        open
        defaultPickerValue={defaultValue}
        dateRender={(current: any) => {
          const style: any = {}
          if (current.date() === 1) {
            style.border = '1px solid red'
            style.borderRadius = '50%'
          }
          return (
            <div className="cfx-picker-cell-inner" style={style}>
              {current.date()}
            </div>
          )
        }}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `getPopupContainer` should works', () => {
    const customClass = 'blabla'
    let element = document.createElement('article')
    element.className = customClass
    document.body.appendChild(element)
    const wrapper = mount(
      <DatePicker open getPopupContainer={() => element} defaultPickerValue={defaultValue} />,
    )
    expect(
      document.querySelectorAll(`.${customClass} .cfx-picker-dropdown`).length,
    ).toBeGreaterThan(0)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `mode` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open mode="time" defaultPickerValue={defaultValue} />
        <DatePicker open mode="date" defaultPickerValue={defaultValue} />
        <DatePicker open mode="month" defaultPickerValue={defaultValue} />
        <DatePicker open mode="year" defaultPickerValue={defaultValue} />
        <DatePicker open mode="week" defaultPickerValue={defaultValue} />
        <DatePicker open mode="decade" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `panelRender` should works', () => {
    const wrapper = mount(
      <DatePicker
        open
        panelRender={() => <div>panelRender</div>}
        defaultPickerValue={defaultValue}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `picker` should works', () => {
    const wrapper = mount(
      <div>
        <DatePicker open picker="time" defaultPickerValue={defaultValue} />
        <DatePicker open picker="date" defaultPickerValue={defaultValue} />
        <DatePicker open picker="month" defaultPickerValue={defaultValue} />
        <DatePicker open picker="year" defaultPickerValue={defaultValue} />
        <DatePicker open picker="week" defaultPickerValue={defaultValue} />
        <DatePicker open picker="quarter" defaultPickerValue={defaultValue} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `popupStyle` should works', () => {
    const wrapper = mount(
      <DatePicker
        open
        popupStyle={{ color: 'red', background: 'green' }}
        defaultPickerValue={defaultValue}
      />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `bordered` should works', () => {
    const wrapper = mount(<DatePicker open bordered={false} defaultPickerValue={defaultValue} />)
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `suffixIcon` should works', () => {
    const wrapper = mount(
      <DatePicker open suffixIcon={<Wifi />} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `style` should works', () => {
    const wrapper = mount(
      <DatePicker open style={{ width: 300, height: 50 }} defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onOpenChange` should works', () => {
    let state = false
    const callback = jest.fn().mockImplementation(open => (state = open))
    const wrapper = mount(<DatePicker onOpenChange={callback} defaultPickerValue={defaultValue} />)
    openPicker(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(state).toEqual(true)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `onPanelChange` should works', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker open onPanelChange={callback} defaultPickerValue={defaultValue} />,
    )
    nextMonth(wrapper)
    expect(callback).toHaveBeenCalled()
    nextYear(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should trigger event when changed', () => {
    const callback = jest.fn()
    const wrapper = mount(<DatePicker open onChange={callback} defaultPickerValue={defaultValue} />)
    selectCell(wrapper, 3)
    expect(callback).toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when disabled', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker onChange={callback} disabled defaultPickerValue={defaultValue} />,
    )
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should ignore event when readonly', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <DatePicker onChange={callback} inputReadOnly defaultPickerValue={defaultValue} />,
    )
    openPicker(wrapper)
    expect(callback).not.toHaveBeenCalled()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should clear text', () => {
    let value = ''
    const callback = jest.fn().mockImplementation((_date, dateString) => (value = dateString))
    const wrapper = mount(
      <DatePicker open onChange={callback} allowClear defaultPickerValue={defaultValue} />,
    )

    selectCell(wrapper, 3)
    expect(callback).toHaveBeenCalled()
    expect(value).toContain('-03')

    clearInput(wrapper)
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `disabledDate` should works', () => {
    function disabledDate(current: any) {
      return current && current < dayjs().endOf('day')
    }
    const wrapper = mount(
      <DatePicker disabledDate={disabledDate} open defaultPickerValue={defaultValue} />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('prop `dropdownClassName` should works', () => {
    const customClass = 'blabla'
    const wrapper = mount(
      <DatePicker open dropdownClassName={customClass} defaultPickerValue={defaultValue} />,
    )
    expect(document.querySelectorAll(`.cfx-picker-dropdown.${customClass}`).length).toBeGreaterThan(
      0,
    )
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it("cannot select a date that doesn't exist", () => {
    const wrapper = mount(<DatePicker open defaultPickerValue={defaultValue} />)
    expect(() => selectCell(wrapper, 32)).toThrow('Cell not match in picker panel.')
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('specific `format` props with `showTime`', () => {
    const wrapper = mount(
      <DatePicker open showTime defaultPickerValue={defaultValue} format="YYYY-MM-DD a" />,
    )
    expect(wrapper.html()).toMatchSnapshot()
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('method `focus` and `blur` should works', () => {
    let focused = false
    let blurred = false
    const mockFocus = jest.spyOn(HTMLElement.prototype, 'focus')
    const mockBlur = jest.spyOn(HTMLElement.prototype, 'blur')
    mockFocus.mockImplementation(() => {
      focused = true
    })
    mockBlur.mockImplementation(() => {
      blurred = true
    })
    const ref = React.createRef<any>()
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    const wrapper = mount(<DatePicker open showTime ref={ref} onFocus={onFocus} onBlur={onBlur} />)
    ref.current.focus()
    expect(focused).toBeTruthy()
    wrapper.find('input').first().simulate('focus')
    expect(onFocus).toHaveBeenCalled()

    jest.useRealTimers()

    ref.current.blur()
    expect(blurred).toBeTruthy()
    wrapper.find('input').first().simulate('blur')
    setTimeout(() => {
      expect(onBlur).toHaveBeenCalled()
      expect(() => wrapper.unmount()).not.toThrow()
    }, 0)

    mockFocus.mockRestore()
    mockBlur.mockRestore()
  })

  it('method `setValue` should works', () => {
    const ref = React.createRef<any>()

    const wrapper = mount(<DatePicker open ref={ref} />)
    act(() => ref.current.setValue(dayjs('2020-08-08')))

    setTimeout(() => {
      expect(wrapper.find('input').at(0).getDOMNode<HTMLInputElement>().value).toBe('2020-08-08')
      expect(() => wrapper.unmount()).not.toThrow()
    }, 0)
  })

  it('method `getValue` should works', () => {
    const ref = React.createRef<any>()

    const wrapper = mount(<DatePicker open ref={ref} />)
    act(() => ref.current.setValue(dayjs('2020-08-08')))

    setTimeout(() => {
      expect(ref.current.getValue()).toBe(dayjs('2020-08-08'))
      expect(() => wrapper.unmount()).not.toThrow()
    }, 0)
  })

  it('`useDatePickerHandle` should works', () => {
    let focused = false
    let blurred = false
    const mockFocus = jest.spyOn(HTMLElement.prototype, 'focus')
    const mockBlur = jest.spyOn(HTMLElement.prototype, 'blur')
    mockFocus.mockImplementation(() => {
      focused = true
    })
    mockBlur.mockImplementation(() => {
      blurred = true
    })

    let wrapper: any
    const onFocus = jest.fn()
    const onBlur = jest.fn()

    const WithHookPicker: React.FC<{
      doTest?: boolean
    }> = ({ doTest }) => {
      const { ref, setValue, getValue, focus, blur } = useDatePickerHandle()

      useEffect(() => {
        if (doTest) {
          expect(ref).toHaveProperty('current')

          focus()
          expect(focused).toBeTruthy()
          wrapper.find('input').first().simulate('focus')
          expect(onFocus).toHaveBeenCalled()

          jest.useRealTimers()

          blur()
          expect(blurred).toBeTruthy()
          wrapper.find('input').first().simulate('blur')
          expect(onBlur).toHaveBeenCalled()

          setValue(dayjs('2020-08-08'))

          console.log(getValue())

          setTimeout(() => {
            expect(wrapper.find('input').at(0).getDOMNode().value).toBe('2020-08-08')
            expect(getValue()).toBe(dayjs('2020-08-08'))
          }, 0)
        }
      }, [doTest])

      return <DatePicker ref={ref} onFocus={onFocus} onBlur={onBlur} />
    }
    wrapper = mount(<WithHookPicker doTest={false} />)
    wrapper.setProps({ doTest: true })
  })
})
