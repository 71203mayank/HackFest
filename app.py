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
from dotenv import load_dotenv
load_dotenv()
MONGO_DB_URI = os.getenv("MONGO_DB_URI")

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
    

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=1000)
