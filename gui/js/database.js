import {
    createRxDatabase,
    RxDatabase
    /* ... */
  } from 'rxdb';

const db = await createRxDatabase({
    name: 'spitifyDB',
    adapter: 'indexeddb',
    multiInstance: false
})

const dbSchema = {
    'title': 'spitify schema',
    'version': 0,
    'description': 'saves information about the user and his/her listening preferences',
    'type': 'object',
    'properties': {
        'trackID': {
            'type': 'number',
            'primary': true
        },
        'trackName': {
            'type': 'string'
        },
        'artistID': {
            'type': 'array',
            'maxItems': 5,
            'uniqueItems': true,
            'items': {
                'type': 'object',
                'properties': {
                    'artistID0': {
                        'type': 'string'
                    },
                    'artistID1': {
                        'type': 'string'
                    },
                    'artistID2': {
                        'type': 'string'
                    },
                    'artistID3': {
                        'type': 'string'
                    },
                    'artistID4': {
                        'type': 'string'
                    }
                }

            }
        },
        'artistName': {
            'type': 'array',
            'maxItems': 5,
            'uniqueItems': true,
            'items': {
                'type': 'object',
                'properties': {
                    'artistName0': {
                        'type': 'string'
                    },
                    'artistName1': {
                        'type': 'string'
                    },
                    'artistName2': {
                        'type': 'string'
                    },
                    'artistName3': {
                        'type': 'string'
                    },
                    'artistName4': {
                        'type': 'string'
                    }
                }

            }
        },
        'albumType': {
            'type': 'string'
        },
        'albumID': {
            'type': 'string'
        },
        'albumName': {
            'type': 'string'
        },
        'coverImage': {
            'type': 'array',
            'maxItems': 3,
            'uniqueItems': true,
            'items': {
                'type': 'object',
                'properties': {
                    'coverImageURL0': {
                        'type': 'string'
                    },
                    'coverImageURL1': {
                        'type': 'string'
                    },
                    'coverImageURL2': {
                        'type': 'string'
                    }
                }

            }
        },
        'url': {
            'type': 'string'
        },
        'downloaded': {
            'type': 'integer',
            default: 0
        },
        'localUrl': {
            'type': 'string'
        },
        'liked': {
            'type': 'integer',
            default: 0
        },
        'timesHeard': {
            'type': 'integer',
            default: 0
        },
        'timesSkipped': {
            'type': 'integer',
            default: 0
        },
        'startStop': {
            'type': 'string',
        }
    }

}

const SpitifyCollection = await db.collection({
    name: 'test',
    schema: dbSchema,
})





    console.dir(db)