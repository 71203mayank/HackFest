import time
from selenium import webdriver
from selenium.webdriver.common.by import By
# new headless stuff
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_argument("--headless=new")
def scrape_sap_job_listings(url):
    # Initialize Chrome WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)  # Open the provided URL
    time.sleep(5)  # Wait for the page to load completely

    job_listings = []

    # Find all job rows in the table body
    job_rows = driver.find_elements(By.XPATH, '/html/body/div[1]/div[3]/div/div/div[4]/table/tbody/tr')

    # Function to extract job details from a job row
    def extract_job_details(job_row):
        job_name_element = job_row.find_element(By.XPATH, './td[1]/span/a')
        job_name = job_name_element.text.strip()
        job_link = job_name_element.get_attribute('href')
        job_location = job_row.find_element(By.XPATH, './td[2]/span').text.strip()
        
        # Visit the job link to extract the job description
        driver1 = webdriver.Chrome(options=chrome_options)
        driver1.get(job_link)
        time.sleep(2)  # Wait for the page to load completely
        try:
            job_description_element = driver1.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/div/span/span')
            job_description = job_description_element.text.strip()
        except:
            job_description = None
        driver1.quit()
        
        return {'job': job_name, 'link': job_link, 'location': job_location, 'description': job_description,'name':"SAP"}

    # Extract job details from each job row
    for job_row in job_rows:
        job_info = extract_job_details(job_row)
        job_listings.append(job_info)

    driver.quit()  # Close the WebDriver
    return job_listings

# URL of the job listings page
num=0
jobs=[]
for num in range(0,100,25):
	url = f"https://jobs.sap.com/search/?q=&sortColumn=referencedate&sortDirection=desc&startrow={num}&scrollToTable=true"

	# Scrape job listings
	jobs.extend(scrape_sap_job_listings(url))

print(len(jobs))

# To see the JSON format
import json
print(len(jobs))
print("====================================================")
print(json.dumps(jobs, indent=4))

