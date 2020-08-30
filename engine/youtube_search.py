from googleapiclient.discovery import build

def searchYT(query):

    api_key = 'AIzaSyAsDIK2YPLUstWqgC_SUHdkKwmGFn35Lss'

    youtube = build('youtube', 'v3', developerKey=api_key)

    request = search_response = youtube.search().list(
                q="BTS Dynamite",
                part="id,snippet",
                maxResults=1
            )

    response = request.execute()

    videoId = response['items'][0]['id']['videoId']

    return videoId