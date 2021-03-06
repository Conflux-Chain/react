import React from 'react'
import {
  Text,
  Button,
  useTheme,
  CfxUIThemesPalette,
  CfxUIThemesExpressiveness,
  CfxUIThemesLayout,
} from 'components'
import EditorColorItem from './editor-color-item'
import EditorInputItem from './editor-input-item'
import DefaultTheme from 'components/styles/themes/default'
import { useConfigs } from 'lib/config-context'

const basicColors: Array<keyof CfxUIThemesPalette> = [
  'cTheme0',
  'cTheme1',
  'cTheme2',
  'cTheme3',
  'cTheme4',
  'cTheme5',
  'cTheme6',
  'cTheme7',
  'cNeutral0',
  'cNeutral1',
  'cNeutral2',
  'cNeutral3',
  'cNeutral4',
  'cNeutral5',
  'cNeutral6',
  'cNeutral7',
  'cNeutral8',
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
const statusColors: Array<keyof CfxUIThemesPalette> = [
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
const otherColors: Array<keyof CfxUIThemesPalette> = [
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
const expressiveness: Array<keyof CfxUIThemesExpressiveness> = [
  'linkStyle',
  'linkHoverStyle',
  'dropdownBoxShadow',
  'shadowSmall',
  'shadowMedium',
  'shadowLarge',
]
const radiusExpressiveness: Array<keyof CfxUIThemesExpressiveness> = [
  'R0',
  'R1',
  'R2',
  'R3',
  'R4',
  'R5',
]
const shadowExpressiveness: Array<keyof CfxUIThemesExpressiveness> = ['D0', 'D1', 'D2', 'D3', 'D4']

const pageLayout: Array<keyof CfxUIThemesLayout> = [
  'pageWidth',
  'pageWidthWithMargin',
  'pageMargin',
  // 'radius',
]
const gapLayout: Array<keyof CfxUIThemesLayout> = [
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
        <Button variant="text" auto size="mini" onClick={restColors}>
          {isChinese ? '重置' : 'Reset'}
        </Button>
      </Text>
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
        <Button variant="text" auto size="mini" onClick={resetExpressiveness}>
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
        <Button variant="text" auto size="mini" onClick={resetLayout}>
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
