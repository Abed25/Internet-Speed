from fastapi import FastAPI
import speedtest as st
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (or specify your frontend URL)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def SpeedTest():
    test = st.Speedtest()
    downSpeed = test.download()
    downSpeed = round(downSpeed / 10**6, 2)  # Convert to Mbps

    upSpeed = test.upload()
    upSpeed = round(upSpeed / 10**6, 2)  # Convert to Mbps

    return {"download_speed": downSpeed, "upload_speed": upSpeed}

@app.get('/')
def root():
    return {"message": "FastAPI is running"}

@app.get("/speedtest")
def run_speedTest():
    return SpeedTest()