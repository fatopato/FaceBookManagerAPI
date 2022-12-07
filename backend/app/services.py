from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adcreative import AdCreative
from facebook_business.adobjects.adset import AdSet
from facebook_business.adobjects.campaign import Campaign
from facebook_business.api import FacebookAdsApi
from facebook_business.exceptions import FacebookRequestError
from .models import CampaignModel, AdSetModel, AdCreativeModel
import dotenv
import os
import random

dotenv.load_dotenv()

APP_ID = os.getenv("APP_ID")
APP_SECRET = os.getenv("APP_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
ACCOUNT_ID = os.getenv("ACCOUNT_ID")


class FacebookAdService:
    last_created_campaign_id = None
    last_created_ad_set_id = None
    last_created_ad_creative_id = None

    def __initialize__(self):
        FacebookAdsApi.init(APP_ID, APP_SECRET, ACCESS_TOKEN)

    def get_account(self):
        self.__initialize__()
        return AdAccount(ACCOUNT_ID)

    def create_campaign(self, campaign: CampaignModel):

        my_account = self.get_account()
        params = {
            'name': campaign.name,
            'objective': campaign.objective,
            'status': campaign.status,
            'special_ad_categories': campaign.special_categories,
        }
        created_campaign = my_account.create_campaign(
            params=params,
        )
        self.last_created_campaign_id = created_campaign.__dict__.get("_data").get("id")
        print("Campaign created:", self.last_created_campaign_id)
        return created_campaign

    def create_ad_set(self, ad_set_model: AdSetModel):
        params = {
            'name': ad_set_model.name,
            'daily_budget': ad_set_model.daily_budget,
            'start_time': ad_set_model.start_time,
            'end_time': ad_set_model.end_time,
            'bid_amount': ad_set_model.bid_amount,
            'billing_event': ad_set_model.billing_event,
            'optimization_goal': ad_set_model.optimization_goal,
            'targeting': {'geo_locations': {'countries': ad_set_model.target_countries},  # kw,ua,
                          'age_min': ad_set_model.target_min_age,
                          'age_max': ad_set_model.target_max_age},

            'campaign_id': ad_set_model.campaign_id,
            'status': ad_set_model.status,
        }
        my_account = self.get_account()
        created_ad_set = my_account.create_ad_set(params=params, )
        self.last_created_ad_set_id = created_ad_set.__dict__.get("_data").get("id")
        print("Created Ad Set:", self.last_created_ad_set_id)
        return created_ad_set

    def create_ad_creative(self, ad_creative: AdCreativeModel):
        my_account = self.get_account()
        params = {
            'name': ad_creative.name,
            'image_url': ad_creative.image_url,
            'link_url': ad_creative.link,
            'title': ad_creative.message,
            # 'messenger_sponsored_message': ad_creative.message,
            'object_story_spec': {'page_id': ad_creative.page_id, 'link_data': {
                'message': ad_creative.message,
                'link': ad_creative.link
            }},
        }
        created_ad_creative = my_account.create_ad_creative(params=params)
        self.last_created_ad_creative_id = created_ad_creative.__dict__.get("_data").get("id")
        print("Created Ad Creative:", self.last_created_ad_creative_id)
        return created_ad_creative

    def display_insights(self, ad_set_id, fields=None):
        self.__initialize__()
        if not fields:  # clicks, impressions
            fields = ["clicks"]
        ad_set = AdSet(ad_set_id)
        insights = ad_set.get_insights(fields=fields)
        print(insights)
        return insights

    def preview_ad(self, creative_id, add_format="DESKTOP_FEED_STANDARD", fields=None):
        self.__initialize__()
        if not fields:
            fields = []
        params = {
            'ad_format': add_format,
        }
        previewed_add = AdCreative(creative_id).get_pre_views(fields=fields, params=params, )
        print(previewed_add)
        return previewed_add
