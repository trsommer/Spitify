import pafy

def convertYT(src):
    v = pafy.new(src)
    audioStreams = v.audiostreams
    a_url = v.audiostreams[len(audioStreams)-1].url
    return a_url

