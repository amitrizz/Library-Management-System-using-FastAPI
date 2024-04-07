from fastapi import FastAPI,Request,HTTPException,Response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pydantic import BaseModel
import json
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",  # Assuming React is running on this port
    # Add other origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# models
class Book(BaseModel):
    title: str
    book_id:str
    author: str
    isbn: str
    genre: str

class User(BaseModel):
    user_id: str
    email: str
    full_name: str

class Transaction(BaseModel):
    book_id: str
    user_id: str
    borrow_date: str
    return_date: str


uri="mongodb+srv://amit:amit@cluster0.tysk0hr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri, server_api=ServerApi('1')) 
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


@app.get("/")
def home():
    return "helloUser"

@app.post("/add_book")
async def add_book(book: Book):
    # Convert Pydantic model to dictionary
    book_data = book.model_dump()
    print(book_data)
    db = client["library"]  # Database name
    books_collection = db["books"]  
    # # Insert book data into MongoDB
    existing_book = books_collection.find_one({"book_id": book.book_id})
    if existing_book:
        # Username already exists, raise HTTPException with 409 status code (Conflict)
        raise HTTPException(status_code=409, detail="Book id Aready Exist")
    # # Insert book data into MongoDB
    inserted_book = books_collection.insert_one(book_data) 
    # Return response
    return {"message": "Book created successfully", "data": "inserted_book"}

@app.get("/get_book/{book_id}")
async def get_book(book_id:str,request:Request):
    # Convert Pydantic model to dictionary
    db = client["library"]  # Database name
    books_collection = db["books"]  
    # # Insert book data into MongoDB
    existing_book = books_collection.find_one({"book_id":book_id})
    if not existing_book:
        # Username already exists, raise HTTPException with 409 status code (Conflict)
        raise HTTPException(status_code=409, detail="Book is Not Exist")
    return {"message": "Book created successfully", "data": "inserted_book"}



@app.get("/book_list") 
async def book_list(request:Request):
    db = client["library"]  # Database name
    user_collection = db["books"] 
    cursor=user_collection.find({})
    documents_list = []
    for document in cursor:
        document["_id"] = str(document["_id"])
        documents_list.append(document)
    return {"message": "User created successfully", "data": documents_list}


 
@app.post("/add_user")
async def add_user(user:User):
    user_data = user.model_dump()
    # print(user.username)
    db = client["library"]  # Database name
    users_collection = db["users"] 
    # # Insert book data into MongoDB
    existing_user = users_collection.find_one({"user_id": user.user_id})
    if existing_user:
        # Username already exists, raise HTTPException with 409 status code (Conflict)
        raise HTTPException(status_code=409, detail="Username already exists")
    inserted_user = users_collection.insert_one(user_data)
    return {"message": "User created successfully", "data": "inserted_book"}




@app.get("/get_user/{user_id}")
async def get_user(user_id:str,request:Request):
    db = client["library"]  # Database name
    users_collection = db["users"] 
    existing_user = users_collection.find_one({"user_id": user_id})
    if not existing_user:
        # Username already exists, raise HTTPException with 409 status code (Conflict)
        raise HTTPException(status_code=409, detail="Username is Not exists")
    return {"message": "User created successfully", "detail": "inserted_book"}




@app.delete("/delete_user/{user_id}")
async def delete_user(user_id:str,request:Request):
    db = client["library"]  # Database name
    users_collection = db["users"] 
    users_collection.delete_one({"user_id":user_id})
    return {"message": "User created successfully", "data": "inserted_book"}



@app.get("/get_users")
async def get_users(request:Request):
    db = client["library"]  # Database name
    users_collection = db["users"] 
    cur=users_collection.find({})
    user_list=[]
    for doc in cur:
        doc["_id"] = str(doc["_id"])
        user_list.append(doc)
    return {"message": "User created successfully", "data": user_list}





@app.post("/borrow_book")
async def borrow_book(transaction:Transaction):
    borrow_data = transaction.model_dump()
    db = client["library"]  # Database name
    tran_collection = db["transactions"] 
    # # Insert book data into MongoDB
    inserted_book = tran_collection.insert_one(borrow_data) 
    return {"message": "User created successfully", "data": "inserted_book"}


@app.get("/borrow_list") 
async def borrow_list(request:Request):
    db = client["library"]  # Database name
    tran_collection = db["transactions"] 
    cursor=tran_collection.find({})
    documents_list = []
    for document in cursor:
        document["_id"] = str(document["_id"])
        documents_list.append(document)
    return {"message": "User created successfully", "data": documents_list}



@app.put("/return_book/{book_id}")
async def return_book(book_id:str,request:Request):
    body_data = await request.json()
    # Print the JSON data (optional)
    user_id=body_data.get("user_id")
    db = client["library"]  # Database name
    tran_collection = db["transactions"] 
    # Get the current date
    current_date = datetime.now().date()

    # Format the date as YYYY-MM-DD
    formatted_date = current_date.strftime("%Y-%m-%d")
    # # Insert book data into MongoDB
    tran_collection.update_one({"book_id": book_id},{"$set": {"return_date": formatted_date}})
    return {"message": "User created successfully", "data": book_id}

