import { useContext } from 'react'
import CounterContext from '../CounterContext'

const AnecdoteForm = ({ newAnecdoteMutation }) => {

  const [notification, dispatch] = useContext(CounterContext)  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    // Call the mutation to create a new anecdote
    const newAnecdote = { content : content, votes: 0 };    
    newAnecdoteMutation.mutate( newAnecdote )

    event.target.anecdote.value = ''
    console.log('new anecdote')

    dispatch({ type: "SET_NOTIFICATION", payload: `You created '${content}'` })
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)       
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
