import AutoComplete, { useAutoCompleteHandle } from './auto-complete'
import AutoCompleteItem from './auto-complete-item'
import AutoCompleteSearching from './auto-complete-searching'
import AutoCompleteEmpty from './auto-complete-empty'

AutoComplete.Item = AutoCompleteItem
AutoComplete.Option = AutoCompleteItem
AutoComplete.Searching = AutoCompleteSearching
AutoComplete.Empty = AutoCompleteEmpty
AutoComplete.useAutoCompleteHandle = useAutoCompleteHandle

export { useAutoCompleteHandle }
export default AutoComplete
