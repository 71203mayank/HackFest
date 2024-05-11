import React from 'react'
import './Features.css'
import FeatureCard from '../FeatureCard/FeatureCard'

export default function Features() {
  return (
    // <div className='features'>
    //   <div className='features-container-one'>
    //     <div className='features-container-one-quest'></div>
    //     <div className='features-container-one-inner'>
    //       <div className='features-container-one-subinner'></div>
    //       <div className='features-container-one-subinner'></div>
    //     </div>
    //   </div>

    //   <div className='features-container-two'>
    //     <div className='features-container-two-inner'>
    //       <div className='features-container-two-inner-left'></div>
    //       <div className='features-container-two-inner-left'></div>
    //     </div>
    //     <div className='features-container-two-inner'></div>
    //   </div>

    //   <div className='features-container-three'></div>
    // </div>

    <div className='features'>
      <div className='features-container'>
        <div className='feature-temp-top-quest'>What do we have for you?</div>
        <div></div>
        <div className='features-container-inner'>
          <img className='feature-container-img feature-img-one' src='./asset/all-in-one.svg' alt='all-in-one'></img>
          <FeatureCard 
          imgLink = {'./asset/job.svg'}
          title = {'All job, one site'}
          desc = {'Streamlining your job search experience like never before.'}
          />
        </div>
        <div className='features-container-inner'>
          <img className='feature-container-img feature-img-two' src='./asset/ai-mind.svg' alt='ai-mind'></img>
          <FeatureCard 
          imgLink = {'./asset/ai.svg'}
          title = {'AI-driven application builder'}
          desc = {'Revolutionize application creation with AI. Craft personalized, professional documents effortlessly.'}
          />
        </div>
        <div className='features-container-inner-temp feature-temp-left'>
          <div className='features-temp-left-inner'>
            <FeatureCard 
            imgLink = {'./asset/ai-setting.svg'}
            title = {'AI application checker'}
            desc = {'Boost your chances of success by vetting your application with AI.'}
            />
          </div>
          <div className='features-temp-left-inner'>
            <FeatureCard 
            imgLink = {'./asset/diary.svg'}
            title = {'Interview diaries'}
            desc = {'Gain valuable insights and learn from others’ experiences.'}
            />
          </div>
        </div>
        <div className='features-container-inner-temp feature-temp-right'>
          <div className='feature-temp-right-quest'>Worried AI replacing your job? </div>
          <div className='feature-temp-right-main'>Utilize<br></br>AI to<br></br>Get a Job</div>
          
        </div>
        <div className='features-container-inner'>
          <img className='feature-container-img feature-img-three' src='./asset/chatbot.svg' alt='bot-img'></img>
          <FeatureCard 
          imgLink = {'./asset/book.svg'}
          title = {'Prepare with us'}
          desc = {'Personalized guidance to excel in interviews, powered by AI.'}
          />
        </div>
        <div className='features-container-inner'>
          <img className='feature-container-img feature-img-four' src='./asset/globe.svg' alt='bot-img'></img>
          <FeatureCard 
          imgLink = {'./asset/human-resource.svg'}
          title = {'Post and hire top talents'}
          desc = {'Effortlessly find exceptional talent by simply posting your job opportunity with us.'}
          />
        </div>
        
      </div>
    </div>
  )
}
