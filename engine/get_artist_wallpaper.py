from selenium import webdriver
from bs4 import BeautifulSoup
from urlextract import URLExtract
import time
options = webdriver.ChromeOptions()

#options.add_argument('headless')
options.add_argument('window-size=200x400')

import sys
def getArtistWallpaper(id):

    driver = webdriver.Chrome(options=options)
    url = 'https://open.spotify.com/artist/' + id
    driver.get(url)
    time.sleep(1)
    html = driver.page_source
    soup = BeautifulSoup(html, features="lxml")
    
    #Background Image
    result = soup.find('div', attrs={'data-testid': 'background-image'})
    style = result['style']
    ext = URLExtract()
    urls = ext.find_urls(style)
    bgImage = urls[0]

    #Biography
    #results = soup.findAll("p", {"class": "ArtistAbout__paragraph"})
    #paragraph = results[0] 
    #print(paragraph)

    return bgImage

print(getArtistWallpaper(sys.argv[1]))
sys.stdout.flush()

