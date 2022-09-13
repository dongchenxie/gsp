import { useReducer, useEffect } from 'react'
import axios from 'axios'
//Define all actions in an object which we can perform on a state
const ACTIONS = {
  MAKE_REQUEST: 'make-request',
  GET_DATA: 'get-data',
  ERROR: 'error',
}

const JOBS_API = 'https://projects.test.api.goldspot.ca/goldspot/common/jobstest'

//Use reducer to handle all the different states
function reducer(state, action) {
  // Everything called in dispatch will be populated inside action variable
  //Switch statements for each action
  switch (action.type) {
    case ACTIONS.MAKE_REQUEST:
      return { loading: true, jobs: [] }
    case ACTIONS.GET_DATA:
      return { loading: false, jobs: action.payload.jobs }
    case ACTIONS.ERROR:
      return { ...state, loading: false, error: action.payload.error, jobs: [] }
    default:
      return state
  }
}

export default function useFetchJobs(params, page) {
  //reducer will be called everytime we call dispatch
  const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true }) //default state

  useEffect(() => {
    //Call dispatch to make new request
    dispatch({ type: ACTIONS.MAKE_REQUEST }) // It will update state
    //Call API
    axios.get(JOBS_API, {
      params: {  page: page, ...params },
      headers:{
        Authorization:"SuperSecretToken888"
      }
      }).then(res => {
      dispatch({type: ACTIONS.GET_DATA, payload:{jobs: res.data}})
      console.log(res.data)
    }).catch(e => {
      dispatch({type: ACTIONS.ERROR, payload:{error: e}})
    })
  }, [params, page])

  return state
}
