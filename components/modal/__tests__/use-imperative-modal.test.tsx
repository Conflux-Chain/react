import React, { useEffect } from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Modal, Button } from 'components'
import { nativeEvent, updateWrapper } from 'tests/utils'

export const expectModalIsOpened = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).not.toBe(0)
}

export const expectModalIsClosed = (wrapper: ReactWrapper) => {
  expect(wrapper.find('.content').length).toBe(0)
}

describe('useModalHandle', () => {
  it('should follow change with use-imperative-modal', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Modal ref={ref}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 300)
    expectModalIsOpened(wrapper)

    wrapper.setProps({ show: false })
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })
})

describe('closeModal', () => {
  it('should close directly when open is underfined', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Modal ref={ref} onClose={() => setVisible(false)}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 500)
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })
})

describe('setVisible', () => {
  it('when setVisible set underfined, should close directly', async () => {
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
      }, [show])
      return (
        <Modal ref={ref} onClose={() => setVisible()}>
          <Modal.Title>Modal</Modal.Title>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 500)
    wrapper.find('.backdrop').simulate('click', nativeEvent)
    await updateWrapper(wrapper, 500)
    expectModalIsClosed(wrapper)
  })
})

describe('getVisible', () => {
  it('should get current visible', async () => {
    let log = ''
    jest.spyOn(console, 'log').mockImplementation(msg => (log = msg))
    const MockModal: React.FC<{ show?: boolean }> = ({ show }) => {
      const { setVisible, getVisible, ref } = Modal.useModalHandle()
      useEffect(() => {
        if (show !== undefined) setVisible(show)
        setTimeout(() => console.log(getVisible()), 0)
      }, [show])
      // useEffect(() => {
      //   console.log(getVisible())
      // }, [show])
      return (
        <Modal ref={ref} onClose={() => setVisible(false)}>
          <Modal.Title>Modal</Modal.Title>
          <Modal.Content>{getVisible()}</Modal.Content>
        </Modal>
      )
    }

    const wrapper = mount(<MockModal />)
    wrapper.setProps({ show: true })
    await updateWrapper(wrapper, 500)
    expect(log).toEqual(true)
    wrapper.setProps({ show: false })
    await updateWrapper(wrapper, 500)
    expect(log).toEqual(false)
  })
})
