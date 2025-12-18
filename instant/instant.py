from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def instant():
    return {"message": "This is an instant response!"}

