import { useNoteActions } from './store'

const VisibilityFilter = () => {
  const { setFilter } = useNoteActions()

  return (
    <fieldset>
      <legend>filter:</legend>
      <label>
        <input
          type="radio"
          name="filter"
          onChange={() => setFilter('all')}
          defaultChecked
        />
        all
      </label>
      <label>
        <input type="radio" name="filter" onChange={() => setFilter('important')} />
        important
      </label>
      <label>
        <input type="radio" name="filter" onChange={() => setFilter('nonimportant')} />
        not important
      </label>
    </fieldset>
  )
}

export default VisibilityFilter
