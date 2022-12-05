from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import CampaignModel, AdSetModel, AdCreativeModel
from .services import FacebookAdService

app = FastAPI()
service = FacebookAdService()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to your todo list."}


@app.post("/campaigns/")
async def create_campaign(campaign: CampaignModel):
    return service.create_campaign(campaign)


@app.post("/adsets/")
async def create_ad_set(ad_set: AdSetModel):
    return service.create_ad_set(ad_set)


@app.post("/ad-creatives/")
async def create_ad_set(ad_creative: AdCreativeModel):
    return service.create_ad_creative(ad_creative)


@app.post("/ad-creatives/")
async def create_ad_set(ad_creative: AdCreativeModel):
    return service.create_ad_creative(ad_creative)


