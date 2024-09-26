import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useReducer } from 'react'  
import CounterContext from './CounterContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "CLEAR_NOTIFICATION":
      return null
    default:
      return state
  }
}

const App = () => {

  const [notification, dispatch] = useReducer(notificationReducer, null) 

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })  

  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getAnecdotes,
    retry : false
  })  

  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {    
    return <div>loading data...</div>  
  }

  if(result.isError){
    return <div>anecdote service not available due to problems in server</div>  
  }

  const anecdotes = result.data  



  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes : anecdote.votes + 1 })  
    dispatch({ type: "SET_NOTIFICATION", payload: `You voted for '${anecdote.content}'` })
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" })
    }, 5000)     
  }  


  return (
    <div>
      <CounterContext.Provider value={[notification, dispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </CounterContext.Provider>        
    </div>
  )
}

export default App
