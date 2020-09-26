import get_song
import sys
import json


search_input = sys.argv[1]
#search_input = "a"
#print(search_input)

returnArray = get_song.makeRequestTrack(search_input)
json_r = json.dumps(returnArray)

print(json_r)
sys.stdout.flush()