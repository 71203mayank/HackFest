from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import requests
url = 'http://0.0.0.0:1000/jobs/'

# Make the API call
response = requests.get(url)
jobs = response.json()
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

existing_jobs = list(collection.find({}, {"_id": 0}))
existing_jobs_dict = {job['job_id']: job for job in existing_jobs}

# Step 2: Prepare incoming jobs dict
incoming_jobs_dict = {job['job_id']: job for job in jobs}

jobs_to_add = [job for job_id, job in incoming_jobs_dict.items() if job_id not in existing_jobs_dict]
jobs_to_update = [job for job_id, job in incoming_jobs_dict.items() if job_id in existing_jobs_dict and job != existing_jobs_dict[job_id]]
jobs_to_delete = [job_id for job_id in existing_jobs_dict if job_id not in incoming_jobs_dict]

# Step 4: Perform database operations
if jobs_to_add:
    collection.insert_many(jobs_to_add)
if jobs_to_update:
    for job in jobs_to_update:
        collection.update_one({"job_id": job["job_id"]}, {"$set": job})
if jobs_to_delete:
    for job_id in jobs_to_delete:
        collection.delete_one({"job_id": job_id})

print("Database synchronized.")