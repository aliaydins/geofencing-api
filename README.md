## Geofencing with Tile38

This service an example of geofencing detect with notification


### Design
<img src="https://github.com/aliaydins/geofencing-api/blob/master/_img/tile38.png"></img>


### Running with Docker

```
docker-compose up
```

Check every service status 'UP' with enpoints

```
curl -X GET http://localhost:8081/health
curl -X GET http://localhost:8082/health
```

List all events 
```
curl -X GET http://localhost:8082/
```


DEMO: [medium](https://medium.com/@ali.aydinn/tile38-ile-geofencing-bf9494a736f3) 
