import {useReducer,useEffect,useState} from 'react'
import { apiGet } from './config';

function showsReducer(state,action)
{
    switch(action.type)
    {
        case 'ADD':{
            return [...state,action.showId]
        }
        case 'REMOVE':{
            return state.filter(showId=>showId!==action.showId)
        }

        default:return state;
    }
}

function usePersistedReducer(reducer,initialState,key)
{
    const [state,dispatch]=useReducer(reducer,initialState,(initial)=>{
        const persisted=localStorage.getItem(key);

        return persisted?JSON.parse(persisted):initial
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(state))
    },[state,key])

    return [state,dispatch]
}

export function useShows(key='shows')
{
    return usePersistedReducer(showsReducer,[],key)
}

export function useLastQuery(key='lastQuery')
{
    const [input, setInput] = useState(()=>{
        const persisted=sessionStorage.getItem(key)
        return persisted?JSON.parse(persisted):''
    })

    const setPersistedInput=newState=>{
        setInput(newState)
        sessionStorage.setItem(key,JSON.stringify(newState))
    }
    return [input,setPersistedInput]
}
const reducer=(state,action)=>{
    switch(action.type)
    {
        case 'FETCH_SUCCESS':
            return {isLoading:false,error:null,show:action}
        case 'FETCH_FAILED':
            return {...state,isLoading:false,error:action.error}

        default:return state
    }

}

export function useShow(showId)
{
    const [state,dispatch]=useReducer(reducer,{
        show:null,
        isLoading:true,
        error:null
    })


    // const [show,setShow]=useState(null)
    // const [isLoading, setIsLoading] = useState(true)
    // const [error,setError]=useState(null)
    

    useEffect(() => {
        let isMounted=true
        apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)

        .then(res=>{
            setTimeout(() => {
                if(isMounted)
                {
                    dispatch({type:'FETCH_SUCCESS',show:res})
                    // setShow(res)
                    // setIsLoading(false)
                }
                
            }, 2000);
            
        }).catch(err=>{
            if(isMounted){
                dispatch({type:'FETCH_FAILED',error:err.message})
                // setError(err.message);
                // setIsLoading(false)
            }
        return ()=>{
            isMounted=false
        }

        })
    }, [showId])
    
    return state
}