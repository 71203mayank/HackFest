import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def scrape_salesforce_job_listings(url):
    # Set Chrome options for headless mode
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")  # Enable headless mode

    # Initialize Chrome WebDriver with headless option
    driver = webdriver.Chrome(options=chrome_options)
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
        driver1 = webdriver.Chrome(options=chrome_options)
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
        print(job_description)
        driver1.quit()
        return {'job': job_name, 'link': job_link, 'location': job_location, 'description': job_description,'name':"Salesforce"}

    # Extract job details from each job element
    for job_element in job_elements:
        job_info = extract_job_details(job_element)
        job_listings.append(job_info)

    driver.quit()  # Close the WebDriver
    return job_listings


   




num=1
jobs=[]
for num in range(1,3):
	salesforce_careers_url = f"https://careers.salesforce.com/en/jobs/?page={num}#results"

	# Scrape job listings
	jobs.extend(scrape_salesforce_job_listings(salesforce_careers_url))

print(len(jobs))  # This will print the total number of job entries

# To see the JSON format
import json
print(len(jobs))
print("====================================================")
print(json.dumps(jobs, indent=4))
