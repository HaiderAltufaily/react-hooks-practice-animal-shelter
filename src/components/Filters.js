import React, { useState } from "react";

function Filters({onChangeType,onFindPetsClick}) {
  const [selectValue,setSelectValue]= useState("all")
  function handleSelect(e){
    setSelectValue(e.target.value)
    onChangeType(e.target.value)
  }
  function findPets(){
    onFindPetsClick()
  }
  return (
    <div className="ui form">
      <h3>Animal type</h3>
      <div className="field">
        <select value= {selectValue} onChange= {handleSelect} name="type" id="type" aria-label="type">
          <option value="all">All</option>
          <option value="cat">Cats</option>
          <option value="dog">Dogs</option>
          <option value="micropig">Micropigs</option>
        </select>
      </div>

      <div className="field">
        <button onClick={findPets} className="ui secondary button">Find pets</button>
      </div>
    </div>
  );
}

export default Filters;
