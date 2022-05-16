import {useState} from 'react'


function Search({onSearch}) {
    const [currentSearch, setCurrentSearch] = useState('')

  

    function handleSubmit(e) {
        e.preventDefault()
        onSearch(currentSearch)
        setCurrentSearch('')
    }

    return(
        <div>
        <form onSubmit={handleSubmit} >
        {/* <TextField className={classes.field} label="Search Places" variant="outlined" color="primary" size="large"  */}
         
            <input className='search'
            type="text"
            name="search"
            placeholder="Search by city..."
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value)}></input>
       {/* /> */}
        
        </form>
        </div>

    )
}

export default Search;