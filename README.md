jwt-express [![build](https://travis-ci.org/daggerok/jwt-express.svg?branch=master)](https://travis-ci.org/daggerok/jwt-express)
===========


```sh
$ npm i
$ npm start
```

bash + curl

```bash
$ curl localhost:3000
[]
$ curl localhost:3000/api/users -XPOST -d username=max
UnauthorizedError: No authorization token was found
...
$ curl localhost:3000/login -XPOST -d username=usr -d password=pwd
{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzciIsInBhc3N3b3JkIjoicHdkIiwiaWF0IjoxNDc0MTI3MTU0fQ.OkScCbPS3j2FblzZCvvMyJYs1DRymwJgdiXLR1Qu_64"}
$ export TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzciIsInBhc3N3b3JkIjoicHdkIiwiaWF0IjoxNDc0MTI3MTU0fQ.OkScCbPS3j2FblzZCvvMyJYs1DRymwJgdiXLR1Qu_64
```

```sh
$ curl localhost:3000/api/users -XPOST -d username=max -H "Authorization: Bearer $TOKEN"
$ curl localhost:3000
[{"id":1,"username":"max"}]
```

fish + http

```fish
$ http :3000/
[]
$ http post :3000/login username=max password=password
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heCIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE0NzQxMjc4MDl9.Done3lSNoJLWCXpoKUz56W3k8ExH-f8c1FxjYRpJPhk"
}
$ set TOKEN eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1heCIsInBhc3N3b3JkIjoicGFzc3dvcmQiLCJpYXQiOjE0NzQxMjc4MDl9.Done3lSNoJLWCXpoKUz56W3k8ExH-f8c1FxjYRpJPhk
$ http post :3000/api/users username=Max "Authorization: Bearer $TOKEN"
[
    {
        "id": 1,
        "username": "Max"
    }
]
$ http post :3000/api/users username=Lex "Authorization: Bearer $TOKEN"
[
    {
        "id": 1,
        "username": "Max"
    },
    {
        "id": 2,
        "username": "Lex"
    }
]
```
