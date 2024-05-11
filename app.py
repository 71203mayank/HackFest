from fastapi import FastAPI
import json
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import uvicorn
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from typing import List, Dict
import os
from pydantic import BaseModel
from langchain.llms.openai import OpenAIChat
from langchain.prompts import PromptTemplate
from typing import Optional
from dotenv import load_dotenv

from langchain.chains import LLMChain
load_dotenv()

MONGO_DB_URI = os.getenv("MONGO_DB_URI")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
app = FastAPI()

chrome_options = Options()
chrome_options.add_argument("--headless=new")

def scrape_google_job_listings(url):
    driver = webdriver.Chrome(options=chrome_options)  # Initialize Chrome WebDriver
    driver.get(url)  # Open the provided URL
    time.sleep(3)
    job_listings = []

    # Function to extract job details from a job element
    def extract_job_details(job_element):
        job_position = job_element.find_element(By.XPATH, './div/div/div[1]/div/div[1]/div/h3').text.strip()
        job_location = job_element.find_element(By.XPATH, './div/div/div[1]/div/div[3]/p/span/span').get_attribute('innerText').strip()
        job_link = job_element.find_element(By.XPATH, './div/div/div[1]/div/div[5]/div/a').get_attribute('href')
        # Visit the job link to extract the job description
        driver1 = webdriver.Chrome(options=chrome_options)
        driver1.get(job_link)
        time.sleep(2)
        job_description = driver1.find_element(By.XPATH, '/html/body/c-wiz[1]/div/div[2]/div/div/div[2]/main/div/c-wiz/div/div/div/span/div/div[5]').text.strip()
        driver1.quit()
        out= {'job': job_position, 'link': job_link, 'location': job_location, 'description': job_description, 'name': "Google"}
        print(out)
        return out
        

    # Find all job elements on the current page
    job_elements = driver.find_elements(By.XPATH, '/html/body/c-wiz[1]/div/div[2]/div/div/div[2]/main/div/c-wiz/div/ul/li')
    
    # Extract job details from each job element
    for job_element in job_elements:
        job_info = extract_job_details(job_element)
        job_listings.append(job_info)
        
    driver.quit()  # Close the WebDriver
    return job_listings

def scrape_salesforce_job_listings(url):
    # Set Chrome options for headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Enable headless mode

    # Initialize Chrome WebDriver with headless option
    driver = webdriver.Chrome()
    driver.get(url)  # Open the provided URL
    time.sleep(3)

    # Find all job elements on the current page
    job_elements = driver.find_elements(By.XPATH, '/html/body/main/div[1]/div/div[2]/section/div[2]/div/div')

    job_listings = []

    # Function to extract job details from a job element
    def extract_job_details(job_element):
        job_name_element = job_element.find_element(By.XPATH, './/h3/a')
        job_name = job_name_element.text.strip()
        job_location = job_element.find_element(By.XPATH, './/ul/li/ul/li').text.strip()
        job_link = job_name_element.get_attribute('href')
        
        # Visit the job link to extract the job description
        driver1 = webdriver.Chrome()
        driver1.get(job_link)
        print(job_link)
        time.sleep(2)
        # Extract job description
        try:
            job_description_element = driver1.find_element(By.XPATH, '/html/body/main/div/div/div/article/p[1]')
            job_description = job_description_element.text.strip()
        except:
            try:
                job_description_element = driver1.find_element(By.XPATH, '/html/body/main/div/div/div/article/div[1]')
                job_description = job_description_element.text.strip()
            except:
                job_description = None
   
        driver1.quit()
        out= {'job': job_name, 'link': job_link, 'location': job_location, 'description': job_description,'name':"Salesforce"}
        print(out)
        return out

    # Extract job details from each job element
    for job_element in job_elements:
        job_info = extract_job_details(job_element)
        job_listings.append(job_info)

    driver.quit()  # Close the WebDriver
    return job_listings

@app.get("/jobs/")
def get_jobs():
    jobs = []
    for num in range(1, 2):  # Assuming we are scraping pages 1 and 2
        google_careers_url = f"https://www.google.com/about/careers/applications/jobs/results/?page={num}"
        jobs.extend(scrape_google_job_listings(google_careers_url))
    for num in range(1,3):
        salesforce_careers_url = f"https://careers.salesforce.com/en/jobs/?page={num}#results"
        # Scrape job listings
        jobs.extend(scrape_salesforce_job_listings(salesforce_careers_url))
        
        
    return jobs

uri = MONGO_DB_URI
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["test"] 
collection = db["jobs"] 

@app.get("/jobs-get", response_model=List[Dict])
async def get_jobs():
    cursor = collection.find({})
    documents = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        documents.append(doc)
    return documents

class CVReviewRequest(BaseModel):
    cv_data: str
    job_description: str
    
class Prepare(BaseModel):
    area: str
    time: Optional[str] = None 
    additional_info: Optional[str] = None 
    
class ApplicationBuilder(BaseModel):
    type: str
    cv_data: str
    job_description: str
    

# Initialize the LLM with your API key (assuming environment variable is set)
llm = OpenAIChat(temperature=0.7, model_name="gpt-3.5-turbo-0125")

# Define the prompt template for reviewing CVs

@app.post("/review_cv/")
async def review_cv(request: CVReviewRequest):
    # Prepare the prompt using the request data
    cv_data = request.cv_data
    print(cv_data)
    job_description = request.job_description
    print(job_description)
    prompt = PromptTemplate(template="""You are a CV reviewer, you need to give a rating from 0 to 10.Strictly remember to do this in the beginning .Make sure the rating is consistent. You need to provide a review of the CV and also give 4 points on how the CV can be more perfect for the job description.
                                            CV Information: {cv_data}
                                            Job Description: {job_description}.Strcitly remember to start with the rating and no other phrase""", 
                                input_variables=["cv_data", "job_description"])
    
    # Invoke the language model with the prepared prompt
    llm_chain = LLMChain(
    llm=llm,
    prompt=prompt,
    verbose = True)
    
    response=llm_chain.run(cv_data=cv_data, job_description=job_description)
    
    # Return the model's response as JSON
    return {"review": response}

@app.post("/prepare/")
async def review_cv(request: Prepare):
    # Prepare the prompt using the request data
    
    prompt = PromptTemplate(template="""You are a technical bot that helps users prepare for their job tests and Interviews.The user wants to prepare for {area} and has {time} to prepare. The user also has some additional information {additional_info} that they want to share with you. You need to provide the user with a detailed plan on how they can prepare for the test or interview.Include timelines , video references and theory references.""", 
                                input_variables=["area", "time","additional_info"])
    
    # Invoke the language model with the prepared prompt
    llm_chain = LLMChain(
    llm=llm,
    prompt=prompt,
    verbose = True)
    
    response=llm_chain.run(area=request.area, time=request.time, additional_info=request.additional_info)
    
    # Return the model's response as JSON
    return {"answer": response}

@app.post("/prepare/")
async def review_cv(request: Prepare):
    # Prepare the prompt using the request data
    
    prompt = PromptTemplate(template="""You are a technical bot that helps users prepare for their job tests and Interviews.The user wants to prepare for {area} and has {time} to prepare. The user also has some additional information {additional_info} that they want to share with you. You need to provide the user with a detailed plan on how they can prepare for the test or interview.Include timelines , video references and theory references.Strictly start with the roadmap directly""", 
                                input_variables=["area", "time","additional_info"])
    
    # Invoke the language model with the prepared prompt
    llm_chain = LLMChain(
    llm=llm,
    prompt=prompt,
    verbose = True)
    
    response=llm_chain.run(area=request.area, time=request.time, additional_info=request.additional_info)
    
    # Return the model's response as JSON
    return {"answer": response}

@app.post("/build-app/")
async def review_cv(request: ApplicationBuilder):
    # Prepare the prompt using the request data
    
    prompt = PromptTemplate(template="""You are an aplication builder who builds documents like LORs and SOPs for users. The user wants to build a {type} and has provided you with the following CV data {cv_data} and job description {job_description}. You need to build the document for the user.Make it impressive and sttrictly start with the document directly""",
                            input_variables=["type", "cv_data", "job_description"])
    
    # Invoke the language model with the prepared prompt
    llm_chain = LLMChain(
    llm=llm,
    prompt=prompt,
    verbose = True)
    
    response=llm_chain.run(type=request.type, cv_data=request.cv_data, job_description=request.job_description)
    
    # Return the model's response as JSON
    return {"answer": response}



    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1000)
