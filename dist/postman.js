"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostmanFile = void 0;
const fs = __importStar(require("fs/promises"));
const createPostmanFile = (path, name = "cat") => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.writeFile(`${path}/${name}.postman_collection.json`, `{
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
    }`);
});
exports.createPostmanFile = createPostmanFile;
