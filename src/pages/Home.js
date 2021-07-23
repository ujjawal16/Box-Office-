import React,{useState} from 'react'
import MainPageLayout from '../components/MainPageLayout'
import  ShowGrid  from '../components/show/ShowGrid'
import ActorGrid from '../components/actors/ActorGrid'
import { apiGet } from '../misc/config'
import { useLastQuery } from '../misc/custom-hooks'
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled'
import CustomRadio from '../components/show/CustomRadio'

const Home = () => {

    const [input, setInput] = useLastQuery()
    const [result,setResult]=useState(null)
    const [searchOption, setSearchOption] = useState('shows')

    const isShowsChecked=searchOption==='shows'

    const handleInputChange=(e)=>{
        setInput(e.target.value)
    }
    const onSearch=()=>{

        apiGet(`/search/${searchOption}?q=${input}`)
        .then(response=>{
            setResult(response)
            console.log(response)
        })
       
    }
    const onKeyDown=(e)=>{
        if(e.keyCode===13)
        {
            onSearch();
        }
    }
    const renderResults=()=>{
        if(result && result.length===0)
        {
            return <div>No Matches found!!</div>
        }
        if(result && result.length>0)
        {
            return (
            result[0].show?(<ShowGrid data={result} />)
            :(<ActorGrid data={result} />)
            )
        }
        return null;
    }

    const onRadioChange=(e)=>{
        setSearchOption(e.target.value)
    }
    console.log(searchOption)
    return (
        <MainPageLayout>
            <SearchInput placeholder="Search for Something" type="text" onKeyDown={onKeyDown} onChange={handleInputChange} value={input}/>

        <RadioInputsWrapper>
        <div>

            <CustomRadio 
            label="Shows"
             id="shows-search" 
            value='shows' type="text" 
            onChange={onRadioChange} 
            checked={isShowsChecked} />

          </div>
          <div>
          <CustomRadio 
            label="Actors"
             id="actors-search" 
            value='people' type="text" 
            onChange={onRadioChange} 
            checked={!isShowsChecked} />
            
            </div>
        </RadioInputsWrapper>
        
        <SearchButtonWrapper>
            <button type="button" onClick={onSearch}>Search</button>
        </SearchButtonWrapper>
            {renderResults()}
        </MainPageLayout>
    )
}

export default Home
