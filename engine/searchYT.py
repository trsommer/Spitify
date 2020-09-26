import youtube_search
import youtube_tools
import sys
import json
import urllib

trackName = sys.argv[1]
trackArtist = sys.argv[2]

#trackName = "thriller"
#trackArtist = "Michael Jackson"


response = youtube_tools.convertYT(youtube_search.searchYT(trackArtist + trackName))

print(response)
sys.stdout.flush()

