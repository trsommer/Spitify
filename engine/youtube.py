import pafy
v = pafy.new("gdZLi9oWNZg")
audioStreams = v.audiostreams
a_url = v.audiostreams[len(audioStreams)-1].url
print(a_url)