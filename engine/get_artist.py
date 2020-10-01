import base64
import requests
import datetime
from urllib.parse import urlencode
import json

def getData_tracks(data):

    returnData = {
        'artistID': data['id'],
        'artistName': data['name'],
        'genres': data['genres'],
        'images': [data['images'][0]['url'], data['images'][1]['url'], data['images'][2]['url']],
        'type': data['type']
    }

    return returnData

def makeRequestArtist(query):

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
    endpoint = "https://api.spotify.com/v1/artists/" + query

    data = urlencode({})

    lookup_url = f"{endpoint}?{data}"

    r = requests.get(lookup_url, headers = headers)

    return getData_tracks(r.json())

