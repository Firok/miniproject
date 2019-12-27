# Mini project 
API to return, the country and timezone info, distance (in km or miles) and the time difference in hours, between two geo locations.
 
 ## Setting up the development environment
I am using docker to setup the development environment.

### Setting up docker on Mac
```
# Installing Docker Desktop
```

### Building / Resetting docker services
```
# Removing any unused volume, images, containers
docker system prune -f

# Cloning the repository
cd /path/to/projects
git clone https://github.com/Firok/miniproject.git
cd ./miniproject

# Building docker images, this might take a while for the first time
docker-compose build
```

### Running docker
```
# Run the docker services
docker-compose up
```

Now you can test the API at this endpoint `http://localhost:8080/api/get_distance_and_time`:
```
...
Post Payload
    {
   		"start": {"lat": 33.58831, "lng": -7.61138},
   		"end": {"lat": 35.6895, "lng": 139.69171},
   		"units": "metric"
   	}
...


...
Response Payload
    {
    "start": {
        "country": "Morocco",
        "timezone": "GMT+1",
        "location": {
            "lat": 33.58831,
            "lng": -7.61138
        }
    },
    "end": {
        "country": "Japan",
        "timezone": "GMT+9",
        "location": {
            "lat": 35.6895,
            "lng": 139.69171
        }
    },
    "distance": {
        "value": "15125.9",
        "units": "km"
    },
    "time_diff": {
        "value": 8,
        "units": "hours"
    }
}
...
```