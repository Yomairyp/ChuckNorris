import React from 'react';



const CategoriesItem = ({title, categoryPicked, jokes}) => {

  

   return (
       <div onClick={()=>{ categoryPicked(title) }} >
           <h1>
               {title}
           </h1>
       </div>
   ) 
}


export default CategoriesItem






