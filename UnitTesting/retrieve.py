from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


uri = "mongodb+srv://mayank71203:HackFest-24@cluster0.1tm9agt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client.test
collection = db.jobs 
query = {}
results = collection.find(query)

# Print the results
for result in results:
    print(result)
