from fastapi import FastAPI
from pydantic import BaseModel
from brawlstars_wrapper import BrawlStarsAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImExY2QxYzI3LWVkNmYtNGUyZi04YmY5LTc1YTgzYTFlZjA0OCIsImlhdCI6MTc0MTA3NzYwNCwic3ViIjoiZGV2ZWxvcGVyL2Y2YmIxZWZkLTZiYmYtZjIwNC1lMjJkLWJkOGM4OGI3MzI1NSIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNjYuOTEuNDUuODAiXSwidHlwZSI6ImNsaWVudCJ9XX0.41Q7zkZPXBvDMTLvuNZPAg4iN6ZWgEt-XQjf5q9PsbDWutWgjGVETxZ3VK1UleMpG85LLRXaMw1YhuFFz3WtcA"
brawl_stars_api = BrawlStarsAPI(API_KEY)

class PlayerTag(BaseModel):
    tag: str

@app.post("/player")
async def get_player(player_tag: PlayerTag):
    player_data = brawl_stars_api.get_player(player_tag.tag)
    return player_data

@app.post("/club")
async def get_club(club_tag: PlayerTag):
    club_data = brawl_stars_api.get_club(club_tag.tag)
    return club_data

@app.get("/brawlers")
async def get_brawlers():
    brawlers_data = brawl_stars_api.get_brawlers()
    return brawlers_data

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)