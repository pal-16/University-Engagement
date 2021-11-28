import React from 'react'
import './index.css';

import Card1 from '../../../assets/card-1.webp';
import Card2 from '../../../assets/card-2.webp';
import Card3 from '../../../assets/card-3.webp';


const HomeCard = () => {

  
  return (

    <section className='destinations'>
      <h3>Features offered by the portal</h3>
      <div className='grid' style={{textAlign:"left"}}>
        <div>
          <img  style={{ height:"200px" }} src={Card1} alt='Achievement' />
          <h3>Achievements</h3>
        
           <li>Student can submit an achievement with a valid proof </li>
            <li>Faculty verifies the achievement and allotes university coins</li>
            <li> Filter Applications based on their status</li>
         <li>  Get notified via email</li>

        
        </div>

        <div>
          <img  style={{ height:"200px" }} src={Card2} alt='Crowdfunding' />
          <h3>Crowdfunding</h3>
         
            <li>Raise a request through the portal</li>
            <li>Students with sufficient coin balance can donate via the feed section</li>
         <li> Convert coins to money by a simple email to the institution authorities via the portal </li>
         
        </div>

        <div>
          <img  style={{ height:"200px" }} src={Card3} alt='Projects' />
          <h3>Project</h3>
        
          <li>Submit a project with all the relevant references</li>
            <li>Extensive filtering and sorting available in the project feed to refer</li>
            <li>Like and Comment on a project thus interacting with peers </li>
          
     
         
        </div>
      </div>
    </section>
  )
}

export default HomeCard
