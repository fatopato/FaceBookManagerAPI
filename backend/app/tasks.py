from facebook_business.exceptions import FacebookRequestError

from .services import FacebookAdService
from .models import CampaignModel, AdSetModel, AdCreativeModel
from .mocks import mock_campaign, mock_ad_set, mock_ad_creative

import datetime
import json

service = FacebookAdService()


class TaskManager:
    last_created_campaign_id = -1
    last_created_ad_set_id = -1
    last_created_ad_creative_id = -1

    def task_create_campaign(self):
        params = {"name": "Conversions Campaign Fatih Koprucu", "objective": "REACH"}
        params = json.dumps(params)
        campaign = CampaignModel.parse_raw(params)
        try:
            created_campaign = service.create_campaign(campaign)
            self.last_created_campaign_id = created_campaign.id
            return created_campaign

        # connection error
        except FacebookRequestError:
            created_campaign = mock_campaign(params)
            self.last_created_campaign_id = created_campaign.id
            return created_campaign

    def task_create_ad_set(self):
        now = datetime.datetime.now()
        params = {
            "name": "My First Adset Fatih Koprucu",
            "daily_budget": 2000,
            "start_time": now,
            "end_time": now + datetime.timedelta(days=10),
            "bid_amount": 5,
            "target_min_age": 20,
            "target_max_age": 35,
            "campaign_id": self.last_created_campaign_id,
            "billing_event": "IMPRESSIONS",
            "optimization_goal": "REACH",
            "target_countries": ["US", "KW", "UA"],
            "status": "PAUSED"
        }
        params = json.dumps(params, default=str)
        ad_set = AdSetModel.parse_raw(params)

        try:
            created_ad_set = service.create_ad_set(ad_set)
            self.last_created_ad_set_id = created_ad_set.id
            return created_ad_set

        # connection error
        except FacebookRequestError:
            created_ad_set = mock_ad_set(params)
            self.last_created_ad_set_id = created_ad_set.id
            return created_ad_set

    def task_create_ad_creative(self):
        params = {
            "name": "Gucci AdCreative for Link Ad.",
            "message": "try it out",
            "link": "https://www.ounass.ae/designers/gucci",
            "page_id": 104413048775500,
            "image_url": "https://ibb.co/pP9hNwV"
        }
        params = json.dumps(params)
        ad_creative = AdCreativeModel.parse_raw(params)

        try:
            created_ad_creative = service.create_ad_creative(ad_creative)
            # self.last_created_ad_creative_id = created_ad_creative.id
            return created_ad_creative

        # connection error
        except FacebookRequestError:
            created_ad_creative = mock_ad_creative(params)
            self.last_created_ad_creative_id = created_ad_creative.id
            return created_ad_creative
