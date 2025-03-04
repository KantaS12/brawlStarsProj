import requests

class BrawlStarsAPI:
    Base_URL = "https://api.brawlstars.com/v1"

    def __init__(self, api_key):
        self.api_key = api_key
        self.headers = {
            "Authroization": f"Bearer {self.api_key}",
            "Accept": "application/json"
        }

    def _make_request(self, endpoint):
        url = f"{self.Base_URL}/{endpoint}"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return None
        
    def get_player(self, player_tag):
        player_tag = player_tag.strip('#').upper()
        endpoint = f"players/%23{player_tag}"
        return self._make_request(endpoint)
    
    def get_club(self, club_tag):
        club_tag = club_tag.strip('#').upper()
        endpoint = f"clubs/%23{club_tag}"
        return self._make_request(endpoint)
    
    def get_brawlers(self):
        endpoint = "brawlers"
        return self._make_request(endpoint)
    
    