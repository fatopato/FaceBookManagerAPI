from facebook_business.api import FacebookAdsApi
from facebook_business.adobjects.adaccount import AdAccount
from facebook_business.adobjects.adset import AdSet


my_app_id = '438080767979521'
my_app_secret = 'ff2002ad9af7137b75aafe9e828571e8'
my_access_token = 'EAAGObqCO8AEBAKHQUuU7Ps6VG9daDviaxcx8HrXsgGLupZBNtkXTTdbRHrrnxWeHwSXmAg0AYqZC2HPy2ZCDDtpWXIbRC' \
                  'WqDa3XiVCNdhaeGfuuvYEW7VVkN9sqoZArZAZAuJVMyMdpeaJPgHi50HuzhmMAWLlwrZCd5w0vnNVQEUEglcvw7KxytQtud' \
                  'iGt2i8ZD '
my_account_id = 'act_3061829570753376'
FacebookAdsApi.init(my_app_id, my_app_secret, my_access_token)
my_account = AdAccount(my_account_id)
campaigns = my_account.get_campaigns()
print(campaigns)

adsets = my_account.get_ad_sets(fields=[AdSet.Field.name])

for adset in adsets:
    print(adset[AdSet.Field.name])
