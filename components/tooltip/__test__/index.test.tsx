import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Button, Tooltip, CfxProvider } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'
import { act } from 'react-dom/test-utils'

const expectTooltipIsShow = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.tooltip-content').length).not.toBe(0)
}

const expectTooltipIsHidden = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.tooltip-content').length).toBe(0)
}

const simulateNativeClick = (el: Element) => {
  el.dispatchEvent(
    new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  )
}

const typeWrapper = mount(<div />)
const clickAway = async (wrapper: typeof typeWrapper) => {
  await act(async () => {
    simulateNativeClick(document.body)
  })
  await updateWrapper(wrapper, 150)
}

describe('Tooltip', () => {
  it('should render correctly', async () => {
    const wrapper = mount(
      <CfxProvider theme={{ type: 'dark' }}>
        <Tooltip text={<p id="test">custom-content</p>}>some tips</Tooltip>
      </CfxProvider>,
    )

    expectTooltipIsHidden(wrapper)

    wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent)
    await updateWrapper(wrapper, 150)
    wrapper.find('#test').simulate('click', nativeEvent)
    expectTooltipIsShow(wrapper)

    await updateWrapper(wrapper, 150)
    wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent)
    await updateWrapper(wrapper, 400)
    expectTooltipIsHidden(wrapper)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should call custom mouse event handler when is controlled', async () => {
    const onMouseEnter = jest.fn()
    const onMouseLeave = jest.fn()
    const onClickAway = jest.fn()
    const onVisibleChange = jest.fn()
    const wrapper = mount(
      <CfxProvider theme={{ type: 'dark' }}>
        <div>
          <div id="click-away">click away</div>
          <Tooltip
            visible
            text={<p id="test">custom-content</p>}
            onVisibleChange={onVisibleChange}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClickAway={onClickAway}>
            some tips
          </Tooltip>
        </div>
      </CfxProvider>,
    )

    wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent)
    expect(onMouseEnter).toBeCalledTimes(1)
    expect(onVisibleChange).toBeCalledTimes(1)

    wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent)
    expect(onMouseLeave).toBeCalledTimes(1)

    await clickAway(wrapper)
    expect(onClickAway).toBeCalledTimes(1)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render text when hover it', async () => {
    const wrapper = mount(
      <div>
        <Tooltip text="some text">some tips</Tooltip>
      </div>,
    )
    wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent)
    await updateWrapper(wrapper, 150)
    expectTooltipIsShow(wrapper)

    wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent)
    await updateWrapper(wrapper, 400)
    expectTooltipIsHidden(wrapper)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render react-node when click it', async () => {
    const wrapper = mount(
      <Tooltip text={<p id="test">custom-content</p>} trigger="click">
        <span>click me</span>
      </Tooltip>,
    )
    wrapper.find('.tooltip').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 150)
    expectTooltipIsShow(wrapper)

    const testNode = wrapper.find('#test')
    expect(testNode.length).not.toBe(0)
    expect(testNode.text()).toContain('custom-content')
    act(() => {
      document.body.dispatchEvent(
        new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        }),
      )
    })

    await updateWrapper(wrapper, 400)
    expectTooltipIsHidden(wrapper)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render inner components', async () => {
    const wrapper = mount(
      <Tooltip text="some text" color="dark">
        <Button auto size="small" id="test">
          button
        </Button>
      </Tooltip>,
    )
    expect(wrapper.find('#test').length).not.toBe(0)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correctly by visible', async () => {
    const wrapper = mount(
      <div>
        <Tooltip text={<p id="visible">custom-content</p>} visible={true} placement="right-end">
          some tips
        </Tooltip>
      </div>,
    )

    await updateWrapper(wrapper, 150)
    expect(wrapper.find('#visible').length).toBe(1)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should render correctly by using wrong placement', async () => {
    const wrapper = mount(
      <div>
        <Tooltip
          text={<p id="default-visible">custom-content</p>}
          defaultVisible
          placement={'test' as any}>
          some tips
        </Tooltip>
      </div>,
    )
    expect(wrapper.find('#default-visible').length).toBe(1)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should have the hoverable effect', async () => {
    const onVisibleChange = jest.fn()
    const onMouseLeave = jest.fn()

    const wrapper = mount(
      <Tooltip
        placement="top"
        text="some text"
        hoverable
        hoverableTimeout={200}
        offset={[0, 0]}
        onMouseLeave={onMouseLeave}>
        tooltip
      </Tooltip>,
    )

    // normal show hide
    // on
    await act(async () => {
      wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)

    // off
    await act(async () => {
      wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)
    await updateWrapper(wrapper, 250)
    expectTooltipIsHidden(wrapper)

    wrapper.setProps({ onVisibleChange })

    // hover tooltip -> leave t and hover content -> leave content
    // on
    await act(async () => {
      wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)

    // off
    await act(async () => {
      wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)

    // on content
    await act(async () => {
      wrapper.find('.tooltip-content').simulate('mouseEnter', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)

    // off content
    await act(async () => {
      wrapper.find('.tooltip-content').simulate('mouseLeave', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsHidden(wrapper)

    // hover t -> hover c and leave t -> leave c
    // on
    await act(async () => {
      wrapper.find('.tooltip').simulate('mouseEnter', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)

    // on content
    await act(async () => {
      wrapper.find('.tooltip-content').simulate('mouseEnter', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsShow(wrapper)

    // off
    await act(async () => {
      wrapper.find('.tooltip').simulate('mouseLeave', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    await updateWrapper(wrapper, 250)
    expectTooltipIsShow(wrapper)

    // off content
    await act(async () => {
      wrapper.find('.tooltip-content').simulate('mouseLeave', nativeEvent)
      await updateWrapper(wrapper, 0)
    })
    expectTooltipIsHidden(wrapper)

    expect(() => wrapper.unmount()).not.toThrow()
  })
})
