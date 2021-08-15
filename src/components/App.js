import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" })
  const [isLoading,setIsLoading]= useState(false);
  const [error,setError]= useState(null)
  function onChangeType(filterValue){
   setFilters({
     type:filterValue
   })
  }
  
  async function onFindPetClick(){
    setIsLoading(true)
    setError(null)
    try {
  const response= await fetch(`http://localhost:3001/pets${filters.type!=="all" ? `?type=${filters.type}`:""}`)
  if (!response.ok){
    throw new Error("Something Went Wrong")
  }
  const petsData = await response.json()
  setPets(petsData)
    }catch(error){
      setError(error.message)
    }
    setIsLoading(false)
    
  }
  function onAdoptPet(id){
    const newPets = pets.map((pet)=>{
      if (pet.id === id){
        return {...pet, isAdopted:true}
      } else return pet
     
    })
    setPets(newPets)
  }
  let content 
  if (isLoading){
    content = <h1>Loading...</h1>
  }
  if (error){
    content = <h1>{error}</h1>
  }
  if (pets.length > 0 && !error){
    content = <PetBrowser onAdoptPet= {onAdoptPet} pets={pets} />
  }
  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onFindPetsClick= {onFindPetClick} onChangeType= {onChangeType} />
          </div>
          <div className="twelve wide column">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
