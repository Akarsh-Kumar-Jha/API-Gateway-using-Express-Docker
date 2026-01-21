from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def root_route():
    return {"message": "blog-service working fine..."}

@app.post('/blogs/create-blog')
def create_blog(data:dict):
    return {
        "success":True,
        "message":"Blog created successfully bu blog-service✅",
        "data":data
    }