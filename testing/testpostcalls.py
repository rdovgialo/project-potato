import requests, sys, json

def buildUrl(host, data):
    url = host
    for key in data.keys():
        url = url + f"{key}={data[key]}&"
    return url.strip("&")


def main():
    payload = {
        'username' : 'pythonTestUser2',
        'first_name': "Python",
        'last_name': 'TestUser',
        'email': 'python2@testuser.com',
        'google_id': '333333333'
    }
    #url = buildUrl("http://localhost:5000/api/recipe/post_new/", payload)
    url = "http://localhost:5000/api/recipe/post_new/"
    print(url)
    r = requests.post(url, data=json.dumps(payload))
    print(r.text)

if __name__ == "__main__":
    main()