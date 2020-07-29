import React from 'react'
import { render, mount } from 'enzyme'
import { deepMergeObject } from '../theme-provider/theme-provider'
import DefaultThemes from '../themes/default'
import { ZeitProvider, ZeitUIThemes, Text } from 'components'
import { DeepPartial } from 'components/utils/types'
import { renderHook } from '@testing-library/react-hooks'
import useRgb from '../use-rgb'

describe('ThemeProvider', () => {
  it('should deep merge objects but not add new key', () => {
    const sourceObject: any = {
      palette: {
        success: '#000',
      },
      arr: ['array', 10],
      font: {
        subFont: {
          key: 'font',
        },
      },
    }
    const targetObject: any = {
      palette: {
        warning: '#000',
        success: '#ccc',
      },
      arr: [5],
      font: {
        first: 'first',
      },
    }
    expect(deepMergeObject(sourceObject, targetObject)).toMatchObject({
      palette: {
        success: '#ccc',
      },
      arr: [5, 'array', 10],
      font: {
        subFont: {
          key: 'font',
        },
      },
    })
  })

  it('should merge themes with custom function', () => {
    const customFunc = (): DeepPartial<ZeitUIThemes> => {
      return {
        ...DefaultThemes,
        palette: {
          success: '#ccc',
        },
      }
    }
    const wrapper = render(
      <ZeitProvider theme={customFunc}>
        <Text type="success">hello</Text>
      </ZeitProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should warning when using the wrong merge function', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const customFunc = () => 0 as DeepPartial<ZeitUIThemes>
    const wrapper = mount(
      <ZeitProvider theme={customFunc}>
        <p>test</p>
      </ZeitProvider>,
    )

    expect(errorSpy).toHaveBeenCalled()
    errorSpy.mockRestore()
    wrapper.unmount()
  })

  it('useRgb export right rgb value', () => {
    const { result } = renderHook(() => useRgb('#0054fe'))
    expect(result.current).toEqual({ r: 0, g: 84, b: 254 })
  })

  it('useRgb export null when input a invlid value', () => {
    const { result } = renderHook(() => useRgb('abc'))
    expect(result.current).toEqual(null)
  })
})
