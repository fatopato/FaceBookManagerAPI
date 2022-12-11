from .models import CampaignModel, AdSetModel, AdCreativeModel
import random


def get_random_id():
    return random.randint(120330000000000000, 120330000999999999)


def mock_campaign(params):
    campaign = CampaignModel.parse_raw(params)
    campaign.id = get_random_id()
    return campaign


def mock_ad_set(params):
    ad_set = AdSetModel.parse_raw(params)
    ad_set.id = get_random_id()
    return ad_set


def mock_ad_creative(params):
    ad_creative = AdCreativeModel.parse_raw(params)
    ad_creative.id = get_random_id()
    return ad_creative
