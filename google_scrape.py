import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
# new headless stuff
from selenium.webdriver.chrome.options import Options
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
        job_location =  job_element.find_element(By.XPATH, './div/div/div[1]/div/div[3]/p/span/span').get_attribute('innerText').strip()
        job_link = job_element.find_element(By.XPATH, './div/div/div[1]/div/div[5]/div/a').get_attribute('href')
        # Visit the job link to extract the job description
        driver1 = webdriver.Chrome(options=chrome_options)
        driver1.get(job_link)
        time.sleep(2)
        job_description = driver1.find_element(By.XPATH, '/html/body/c-wiz[1]/div/div[2]/div/div/div[2]/main/div/c-wiz/div/div/div/span/div/div[5]').text.strip()
        driver1.quit()
        out = {'job': job_position, 'link': job_link, 'location': job_location, 'description': job_description, 'name': "Google"}

        return out
        

   
    # Find all job elements on the current page
    job_elements = driver.find_elements(By.XPATH, '/html/body/c-wiz[1]/div/div[2]/div/div/div[2]/main/div/c-wiz/div/ul/li')
        
    # Extract job details from each job element
    for job_element in job_elements:
        job_info = extract_job_details(job_element)
        job_listings.append(job_info)
            
       
    
    driver.quit()  # Close the WebDriver
    return job_listings

# URL of the Google careers page
maxlen=1

num=1
jobs = []
for num in range(1,3):
    google_careers_url = f"https://www.google.com/about/careers/applications/jobs/results/?page={num}"
    # Assuming scrape_google_job_listings returns a list of dictionaries for each page
    jobs.extend(scrape_google_job_listings(google_careers_url))

print(len(jobs))  # This will print the total number of job entries

# To see the JSON format
import json
print(len(jobs))
print("====================================================")
print(json.dumps(jobs, indent=4))


