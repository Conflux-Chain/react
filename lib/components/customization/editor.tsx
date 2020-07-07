import React from 'react'
import {
  Text,
  Button,
  useTheme,
  ZeitUIThemesPalette,
  ZeitUIThemesExpressiveness,
  ZeitUIThemesLayout,
} from 'components'
import EditorColorItem from './editor-color-item'
import EditorInputItem from './editor-input-item'
import DefaultTheme from 'components/styles/themes/default'
import { useConfigs } from 'lib/config-context'

const confluxColors: Array<keyof ZeitUIThemesPalette> = [
  'cThem0',
  'cThem1',
  'cThem2',
  'cThem3',
  'cThem4',
  'cThem5',
  'cThem6',
  'cThem7',
  'cBlack0',
  'cGray0',
  'cGray1',
  'cGray2',
  'cGray3',
  'cGray4',
  'cGray5',
  'cGray6',
  'cWhite0',
]
const basicColors: Array<keyof ZeitUIThemesPalette> = [
  'accents_1',
  'accents_2',
  'accents_3',
  'accents_4',
  'accents_5',
  'accents_6',
  'accents_7',
  'accents_8',
  'foreground',
  'background',
]
const statusColors: Array<keyof ZeitUIThemesPalette> = [
  'success',
  'successLight',
  'successDark',
  'error',
  'errorLight',
  'errorDark',
  'warning',
  'warningLight',
  'warningDark',
]
const otherColors: Array<keyof ZeitUIThemesPalette> = [
  'selection',
  'secondary',
  'link',
  'border',
  'code',
  'cyan',
  'purple',
  'alert',
  'violet',
]
const expressiveness: Array<keyof ZeitUIThemesExpressiveness> = [
  'linkStyle',
  'linkHoverStyle',
  'dropdownBoxShadow',
  'shadowSmall',
  'shadowMedium',
  'shadowLarge',
]

const radiusExpressiveness: Array<keyof ZeitUIThemesExpressiveness> = [
  'R0',
  'R1',
  'R2',
  'R3',
  'R4',
  'R5',
]

const shadowExpressiveness: Array<keyof ZeitUIThemesExpressiveness> = ['D0', 'D1', 'D2', 'D3', 'D4']
const pageLayout: Array<keyof ZeitUIThemesLayout> = [
  'pageWidth',
  'pageWidthWithMargin',
  'pageMargin',
  'radius',
]
const gapLayout: Array<keyof ZeitUIThemesLayout> = [
  'gap',
  'gapNegative',
  'gapHalf',
  'gapHalfNegative',
  'gapQuarter',
  'gapQuarterNegative',
]

const Editor = () => {
  const theme = useTheme()
  const { updateCustomTheme, isChinese } = useConfigs()

  const resetLayout = () => updateCustomTheme({ layout: DefaultTheme.layout })
  const restColors = () => updateCustomTheme({ palette: DefaultTheme.palette })
  const resetExpressiveness = () => {
    updateCustomTheme({ expressiveness: DefaultTheme.expressiveness })
  }

  return (
    <div className="editor">
      <Text h3>
        {isChinese ? '色彩' : 'Colors'}
        <Button type="abort" auto size="mini" onClick={restColors}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
      </Text>
      <p className="subtitle">conflux</p>
      <div className="content">
        {confluxColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '基础' : 'basic'}</p>
      <div className="content">
        {basicColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '状态' : 'status'}</p>
      <div className="content">
        {statusColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '其他' : 'others'}</p>
      <div className="content">
        {otherColors.map((item, index) => (
          <EditorColorItem key={`${item}-${index}`} keyName={item} />
        ))}
      </div>

      <Text h3>
        {isChinese ? '表现力' : 'Expressiveness'}
        <Button type="abort" auto size="mini" onClick={resetExpressiveness}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
      </Text>
      <p className="subtitle">{isChinese ? '基础' : 'basic'}</p>
      <div className="content">
        {expressiveness.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="expressiveness" keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '圆角' : 'radius'}</p>
      <div className="content">
        {radiusExpressiveness.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="expressiveness" keyName={item} />
        ))}
      </div>
      <p className="subtitle">box-shadow</p>
      <div className="content">
        {shadowExpressiveness.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="expressiveness" keyName={item} />
        ))}
      </div>

      <Text h3>
        {isChinese ? '布局' : 'Layout'}
        <Button type="abort" auto size="mini" onClick={resetLayout}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
      </Text>
      {isChinese ? (
        <p>大多数的布局间距都依赖这些变量，不合理的更改可能会导致布局失衡。</p>
      ) : (
        <p>
          Most layout spacing depends on these variables, unreasonable changes may cause layout
          imbalance.
        </p>
      )}
      <p className="subtitle">{isChinese ? '基础' : 'basic'}</p>
      <div className="content">
        {pageLayout.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="layout" keyName={item} />
        ))}
      </div>
      <p className="subtitle">{isChinese ? '间距' : 'gaps'}</p>
      <div className="content">
        {gapLayout.map((item, index) => (
          <EditorInputItem key={`${item}-${index}`} groupName="layout" keyName={item} />
        ))}
      </div>
      <style jsx>{`
        .content {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
          width: auto;
          margin: 0 auto;
          padding-left: ${theme.layout.gapQuarter};
        }

        .editor :global(h3) {
          margin: 2rem 0 1rem 0;
        }

        .subtitle {
          color: ${theme.palette.accents_4};
          text-transform: uppercase;
          font-size: 0.75rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  )
}

export default Editor
