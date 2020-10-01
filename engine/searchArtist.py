import get_artist
import sys
import json


search_input = sys.argv[1]

returnArray = get_artist.makeRequestArtist(search_input)
json_r = json.dumps(returnArray)

print(json_r)
sys.stdout.flush()