import json

def addSongtoDB(newSong_data):
    """
    data = {
        'item1' : {
            'songURL' : 'string',
            'songname': 'string',
            'artist': 'string',
            'posterURL_small': 'string',
            'posterURL_big': 'string',
            'liked': 'bool',
            'time': 'dateTime'
        }


    }
    """


data = {}
data['people'] = []
data['people'].append({
    'name': 'Scott',
    'website': 'stackabuse.com',
    'from': 'Nebraska'
})
data['people'].append({
    'name': 'Larry',
    'website': 'google.com',
    'from': 'Michigan'
})
data['people'].append({
    'name': 'Tim',
    'website': 'apple.com',
    'from': 'Alabama'
})

with open('songs.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
    print('test')