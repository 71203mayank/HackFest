import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import InvalidArgumentException
# new headless stuff
from selenium.webdriver.chrome.options import Options
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# chrome_options = Options()
# chrome_options.add_argument("--headless=new")
# def scrape_sap_job_listings(url):
#     # Initialize Chrome WebDriver
#     driver = webdriver.Chrome(options=chrome_options)
#     driver.get(url)  # Open the provided URL
#     time.sleep(10)  # Wait for the page to load completely

#     job_listings = []

#     # Find all job rows in the table body
#     job_rows = driver.find_elements(By.XPATH, '/html/body/div[1]/div[3]/div/div/div[4]/table/tbody/tr')

#     # Function to extract job details from a job row
#     def extract_job_details(job_row):
#         job_name_element = job_row.find_element(By.XPATH, './td[1]/span/a')
#         job_name = job_name_element.text.strip()
#         job_link = job_name_element.get_attribute('href')
#         job_location = job_row.find_element(By.XPATH, './td[2]/span').text.strip()
        
#         # Visit the job link to extract the job description
#         driver1 = webdriver.Chrome(options=chrome_options)
#         driver1.get(job_link)
#         time.sleep(2)  # Wait for the page to load completely
#         try:
#             job_description_element = driver1.find_element(By.XPATH, '/html/body/div[1]/div[3]/div/div/div[2]/div/div[1]/div[2]/div[1]/div/div/div/span/span')
#             job_description = job_description_element.text.strip()
#         except:
#             job_description = None
#         driver1.quit()
        
#         return {'job': job_name, 'link': job_link, 'location': job_location, 'description': job_description,'name':"SAP"}

#     # Extract job details from each job row
#     for job_row in job_rows:
#         job_info = extract_job_details(job_row)
#         job_listings.append(job_info)

#     driver.quit()  # Close the WebDriver
#     return job_listings

# URL of the job listings page
# num=0
# jobs=[]
# for num in range(0,26,25):
# 	url = f"https://jobs.sap.com/search/?q=&sortColumn=referencedate&sortDirection=desc&startrow={num}&scrollToTable=true"

# 	# Scrape job listings
# 	jobs.extend(scrape_sap_job_listings(url))

uri = "mongodb+srv://mayank71203:HackFest-24@cluster0.1tm9agt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

db = client.test 
collection = db.jobs 

query = {"name": "IBM"}

# Delete the documents matching the query
delete_result = collection.delete_many(query)

# Print the number of documents deleted
print(f"Documents deleted: {delete_result.deleted_count}")

# Close the connection
client.close()
