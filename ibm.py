import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import InvalidArgumentException
# new headless stuff
from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_argument("--headless=new")
def scrape_job_listings(url):
    # Initialize Chrome WebDriver
    driver = webdriver.Chrome(options=chrome_options)
    driver.get(url)  # Open the provided URL
    time.sleep(3)  # Add a sleep time to ensure page loads completely

    job_listings = []

    # Find all job elements on the current page
    job_elements = driver.find_elements(By.XPATH, '/html/body/div[1]/div/div[3]/dds-table-of-contents/div/div/div/div/main/div/div/div/div/div/div[2]/div[2]/div/div[3]/div[7]/div/div')

    #print(len(job_elements))
    # Function to extract job details from a job element
    def extract_job_details(job_element):
        job_name_element = job_element.find_element(By.XPATH, './a/div/div/div/div[2]')
        job_name = job_name_element.text.strip()
        job_link = job_element.find_element(By.XPATH, './a').get_attribute('href')
        
        # Initialize job location and description
        job_location = None
        job_description = None

        # Visit the job link to extract the job location and description
        try:
            driver1 = webdriver.Chrome(options=chrome_options)
            driver1.get(job_link)
            time.sleep(2)  # Add a sleep time to ensure page loads completely
            
            # Extract job location
            try:
                job_location_element = driver1.find_element(By.XPATH, '/html/body/div[2]/div/main/div/section/div/div/div[1]/div/div[1]/div/div[2]/ul/li[1]/div/div')
                job_location = job_location_element.text.strip()
            except:
                pass  # Handle cases where job location element is not found
            
            # Extract job description
            try:
                job_description_element = driver1.find_element(By.XPATH, '/html/body/div[2]/div/main/div/section/div/div/div[3]/div/div[1]/div/div[1]/div')
                job_description = job_description_element.text.strip()
            except:
                pass  # Handle cases where job description element is not found
            #print(job_description)
            driver1.quit()
        except InvalidArgumentException as e:
            print(f"Invalid URL: {job_link}")
            print(e)
        
        return {'job': job_name, 'link': job_link, 'location': job_location, 'description': job_description, 'name':"IBM"}

    # Extract job details from each job element
    for job_element in job_elements:
        job_info = extract_job_details(job_element)
        job_listings.append(job_info)

    driver.quit()  # Close the WebDriver
    return job_listings

# URL of the job listings page
num=1
jobs=[]
for num in range(1,3):
	url = f"https://www.ibm.com/in-en/careers/search?size=10&p={num}"

	# Scrape job listings
	jobs.extend(scrape_job_listings(url))

print(len(jobs))

# To see the JSON format
import json
print(len(jobs))
print("====================================================")
print(json.dumps(jobs, indent=4))
