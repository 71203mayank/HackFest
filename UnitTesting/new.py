import requests
from pymongo.server_api import ServerApi

# API URL
url = 'http://api.example.com/jobs'

# Make the API call
response = requests.get(url)
jobs = response.json()  # Assuming the response body is directly a list of job dicts

from pymongo import MongoClient

# MongoDB Atlas connection string
uri = "mongodb+srv://mayank71203:HackFest-24@cluster0.1tm9agt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


# Connect to MongoDB Atlas
client = MongoClient(uri, server_api=ServerApi('1'))

# Test the connection
db = client.HackFest  # Connect to the 'test' database or replace with your database name
collection = db.jobs  # Replace with your collection name

# Insert jobs into the collection
# collection.insert_many(jobs)

collection.insert_one({"name": "test user", "test": True})