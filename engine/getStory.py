import requests
import wget
from bs4 import BeautifulSoup as bs
import sys

link = "https://www.fanfiction.net/s/11369180/1/Star-Wars-the-Dark-Knight"


def get_story(url):

    r = requests.get(url)
    soup = bs(r.content, "lxml")
    textList = []
    mydiv = soup.find("div", { "id" : "storytext" })
    for p in mydiv.find_all('p'):
        textList.append(p.get_text())
    return textList

def search_story(search):
    
    https://www.fanfiction.net/search/?keywords=star+wars&type=story&match=any&formatid=any&sort=dateupdate&genreid1=0&genreid2=0&characterid1=0&characterid2=0&characterid3=0&characterid4=0&words=0&ready=1&categoryid=0
    
    return 0


print(get_story(link))
#sys.stdout.flush()

