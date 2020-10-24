import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR_BORN } from '../queries'
import Select from 'react-select'

const Authors = props => {
  const results = useQuery(ALL_AUTHORS)

  // const [name, setName] = useState('')
  const [setBornTo, setSetBornTo] = useState('')

  const [selectName, setSelectName] = useState('')

  const [setBornToApollo, result] = useMutation(EDIT_AUTHOR_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const handelSubmit = event => {
    event.preventDefault()

    const name = selectName.value
    setBornToApollo({ variables: { name, setBornTo } })
    // setName('')
    setSetBornTo('')
  }

  if (result.data && result.data.editAuthor === null) {
    console.log('not found.')
  }

  if (!props.show) {
    return null
  }

  if (results.loading) {
    return <div>loading...</div>
  }

  const authors = results.data.allAuthors

  const nameList = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div></div>

      <h2>Set birthyear</h2>
      <form onSubmit={handelSubmit}>
        {/* <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div>
          name
          <Select
            options={nameList}
            defaultValue={selectName}
            onChange={setSelectName}
          />
        </div>
        <div>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(target.value)}
          />
        </div>
        <button type="submit">update auther info</button>
      </form>
    </div>
  )
}

export default Authors
