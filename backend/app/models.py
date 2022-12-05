from datetime import datetime

from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.campaign import Campaign

from pydantic import BaseModel


class CampaignModel(BaseModel):
    name: str
    objective: str
    status = Campaign.Status.paused
    special_categories = []


class AdSetModel(BaseModel):
    name: str
    daily_budget: int
    start_time: datetime
    end_time: datetime
    bid_amount: int
    target_min_age: int
    target_max_age: int
    campaign_id: int
    billing_event = AdSet.BillingEvent.impressions
    optimization_goal = AdSet.OptimizationGoal.reach
    target_countries = []
    status = AdSet.Status.paused


class AdCreativeModel(BaseModel):
    name: str
    message: str
    link: str
    page_id: int
    image_url: str

