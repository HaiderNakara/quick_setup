import * as fs from "fs/promises";


export const createPostmanFile = async (path: string, name: string = "cat") => {
  await fs.writeFile(
    `${path}/${name}.postman_collection.json`,
    `{
      "info": {
        "_postman_id": "73ae9d07-7827-4d9e-ab3d-055bdca63d49",
        "name": "cats",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        "_exporter_id": "23934001"
      },
      "item": [
        {
          "name": "Hello World",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                ""
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get Cats",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/cat/",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                "cat",
                ""
              ]
            }
          },
          "response": []
        },
        {
          "name": "Get Cat By Id",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/cat/635cc5a762f3eb0b84517c54",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                "cat",
                "635cc5a762f3eb0b84517c54"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Delete Cat",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "http://localhost:5000/cat/635cc5a762f3eb0b84517c54",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                "cat",
                "635cc5a762f3eb0b84517c54"
              ]
            }
          },
          "response": []
        },
        {
          "name": "Post Cat",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{'name': 'Alex', 'age': 10, 'color': 'white', 'breed': 'Birman', 'weight': 15}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:5000/cat/",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                "cat",
                ""
              ]
            }
          },
          "response": []
        },
        {
          "name": "Update Cat",
          "request": {
            "method": "PUT",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{'name': 'Alex', 'age': 10, 'color': 'white', 'breed': 'Birman', 'weight': 17}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:5000/cat/646c2a2346e1cf823ad2f72d",
              "protocol": "http",
              "host": [
                "localhost"
              ],
              "port": "5000",
              "path": [
                "cat",
                "646c2a2346e1cf823ad2f72d"
              ]
            }
          },
          "response": []
        }
      ]
    }`
  );
};
