import get_artists
import sys
import json


search_input = sys.argv[1]
#search_input = "taylor"


returnArray = get_artists.makeRequestsArtists(search_input)
json_r = json.dumps(returnArray)

print(json_r)
sys.stdout.flush()