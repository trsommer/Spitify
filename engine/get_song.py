import base64
import requests
import datetime
from urllib.parse import urlencode
import json

def getData_tracks(data):
    x = 0

    returnData = []

    while x < len(data):

        artistID = []
        artistName = []
        y = 0
        while y < len(data[x]['artists']):
            artistID.append(data[x]['artists'][y]['id'])
            artistName.append(data[x]['artists'][y]['name'])
            y = y + 1
        
        returnDataItem = {
        "trackID": data[x]['id'],
        'trackName': data[x]['name'],
        'artistID': artistID,
        'artistName': artistName,
        'albumType': data[x]['album']['album_type'],
        'albumID': data[x]['album']['id'],
        'albumName': data[x]['album']['name'],
        'coverImage': [data[x]['album']['images'][0]['url'], data[x]['album']['images'][1]['url'], data[x]['album']['images'][2]['url']],
        'url': ''
        }

        returnData.append(returnDataItem)
        x = x + 1

    return returnData

def makeRequestTrack(query):

    SPOTIPY_CLIENT_ID ='2a57cf634213446982c7dc689f6f478f'
    SPOTIPY_CLIENT_SECRET ='a91f8884e4a04cc78856b5fb079e18e5'

    client_creds = f"{SPOTIPY_CLIENT_ID}:{SPOTIPY_CLIENT_SECRET}"
    type(client_creds)

    client_creds_base64 = base64.b64encode(client_creds.encode())

    token_url = "https://accounts.spotify.com/api/token"
    method = "POST"
    token_data = {
        "grant_type": "client_credentials"
    }
    token_header = {
        "Authorization": f"Basic {client_creds_base64.decode()}"
    }

    r = requests.post(token_url, data=token_data, headers=token_header)
    valid_request = r.status_code in range(200, 299)

    if valid_request:
        token_response_data = r.json()
        now = datetime.datetime.now()
        access_token = token_response_data['access_token']
        expires_in = token_response_data['expires_in'] #seconds
        expires = now + datetime.timedelta(seconds=expires_in)
        did_expire = expires < now

    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    endpoint = "https://api.spotify.com/v1/search"

    data = urlencode({"q": query, "type": "track", 'limit': 4})

    lookup_url = f"{endpoint}?{data}"

    r = requests.get(lookup_url, headers = headers)

    return(getData_tracks(r.json()['tracks']['items']))