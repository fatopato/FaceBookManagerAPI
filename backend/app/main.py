from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import CampaignModel, AdSetModel, AdCreativeModel
from .services import FacebookAdService
from .tasks import TaskManager

app = FastAPI()
service = FacebookAdService()
task_manager = TaskManager()

origins = [
    "http://localhost:3006",
    "localhost:3006",
    "http://localhost:3000",
    "localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/home", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.post("/campaigns/")
async def create_campaign(campaign: CampaignModel):
    print(campaign)
    return service.create_campaign(campaign)


@app.post("/adsets/")
async def create_ad_set(ad_set: AdSetModel):
    print(ad_set)
    return service.create_ad_set(ad_set)


@app.post("/ad-creatives/")
async def create_ad_creative(ad_creative: AdCreativeModel):
    return service.create_ad_creative(ad_creative)


@app.get("/display-insights/{ad_set_id}")
async def create_ad_set(ad_set_id):
    return service.display_insights(ad_set_id)


@app.post("/tasks/create_campaign")
async def call_task_create_campaign():
    return task_manager.task_create_campaign()


@app.post("/tasks/create_ad_set")
async def call_task_create_ad_set():
    return task_manager.task_create_ad_set()


@app.post("/tasks/create_ad_creative")
async def call_task_create_ad_creative():
    return task_manager.task_create_ad_creative()


