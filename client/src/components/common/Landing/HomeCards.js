import React from 'react'
import './index.css';
const HomeCard = () => {
  return (
    <section className='destinations'>
      <h3>Features offered by the portal</h3>
      <div className='grid' style={{textAlign:"left"}}>
        <div>
          <img  style={{ height:"200px" }} src={"https://image.freepik.com/free-vector/competition-winner-holding-golden-trophy-medal-leadership-achievement_335657-3020.jpg"} alt='destination-1' />
          <h3>Achievements</h3>
        
           <li>Student can submit an achievement with a valid proof </li>
            <li>Faculty verifies the achievement and allotes university coins</li>
            <li> Filter Applications based on their status</li>
         <li>  Get notified via email</li>

        
        </div>

        <div>
          <img  style={{ height:"200px" }} src={"https://image.freepik.com/free-vector/tiny-people-saving-money-piggy-bank-isolated-flat-illustration_74855-11124.jpg"} alt='destination-2' />
          <h3>Crowdfunding</h3>
         
            <li>Raise a request through the portal</li>
            <li>Students with sufficient coin balance can donate via the feed section</li>
         <li> Convert coins to money by a simple email to the institution authorities via the portal </li>
         
        </div>

        <div>
          <img  style={{ height:"200px" }} src={"https://image.freepik.com/free-vector/devops-team-abstract-concept-vector-illustration-software-development-team-member-agile-workflow-devops-team-model-it-teamwork-project-management-integrated-practice-abstract-metaphor_335657-2299.jpg"} alt='destination-3' />
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
