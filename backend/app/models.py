from datetime import datetime, timedelta

from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.campaign import Campaign

from pydantic import BaseModel

now = datetime.now()


class CampaignModel(BaseModel):
    id: int = 0
    name: str
    objective: str
    status = Campaign.Status.paused
    special_categories = []


class AdSetModel(BaseModel):
    id: int = 0
    name: str
    daily_budget: int
    ends_after = 10
    start_time: datetime = now
    end_time: datetime = None
    bid_amount: int
    target_min_age: int
    target_max_age: int
    campaign_id: int
    billing_event = AdSet.BillingEvent.impressions
    optimization_goal = AdSet.OptimizationGoal.reach
    target_countries = []
    status = AdSet.Status.paused


class AdCreativeModel(BaseModel):
    id: int = 0
    name: str
    message: str
    link: str
    page_id: int
    image_url: str
