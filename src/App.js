import React, {useEffect, useState} from 'react';
import CategoriesItem from './CategoriesItem';
import GetJoke from './GetJoke';
import axios from 'axios';
import './App.css';




const App = () => {

  //api stored in categoriesList setting state when you get data 
  const [categories, setCategories] = useState([])
  const [jokes,setJoke] = useState([])
  
  


 

//run every time the page rerenders, unless [] is used as a second arg 
 useEffect(()=>{
  getCatagories()
 
 },[])

 

 //making a function that will run when the page is loaded, will be passed to useEffect
const getCatagories = async ()=>{
  const response = await fetch(`https://api.chucknorris.io/jokes/categories`);
  const data = await response.json();
  // tranferring data to useState
  setCategories(data)
  console.log(data);
}


const categorySelected = async (category)=>{

  let requests =[]
 

  for (let index = 0; index < 20; index++) {
    requests.push(axios.get(`https://api.chucknorris.io/jokes/random?category=${category}`))
    
  }

  axios.all(requests) 
  .then((responses)=>{
    // console.log('responses', responses)
    responses = responses.forEach(element => {
      console.log('joke', element.data.value)
    });
    
    setJoke(responses)
    
  }
  )
  .catch((categoryErr)=>{
    console.log(categoryErr)
  
  });
}

  return (
    <div className= "App">
      {/* stored categories then map through each category and got the made a title
      prop that made which came from category, each item needed a unquie key */}
      {categories.map((category,index) =>(
      <CategoriesItem  title={category}  key={index}  categoryPicked={categorySelected}/>
      ))}
      <GetJoke   categorySelected={jokes}/>

   
    
      
    
      
      
    </div>

  );
  
}

export default App;
