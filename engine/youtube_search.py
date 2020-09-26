#https://github.com/alexmercerind/youtube-search-python
from youtubesearchpython import SearchVideos
import json

def searchYT(query):

    search = SearchVideos(query, offset = 1, mode = "json", max_results = 1)

    search_array = json.loads(search.result())
    
    link = search_array['search_result'][0]['link']

    return link