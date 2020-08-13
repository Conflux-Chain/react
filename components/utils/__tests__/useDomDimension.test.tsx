import useDOMDimension from '../use-dom-dimension'
import React from 'react'
import { mount } from 'enzyme'
describe('useFixedWidth', () => {
    it('should work on a null component', () => {
        function App() {
            const [_, ref] = useDOMDimension<HTMLDivElement>('offsetWidth')
            return <div>{false && <div ref={ref}></div>}</div>
        }
        mount(<App />)
    })
})