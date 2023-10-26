# CarCar

Team:

* Angelina Huang - Service microservice
* Jay Parfenchuck - Sales microservice

### Set-Up Instructions
THIS PROJECT REQUIRES DOCKER
MAKE SURE YOU HAVE DOCKER, GIT, AND NODE.JS 18.2 OR ABOVE

1. Clone the repository to your local machine by running the following command in your terminal:
   ```git clone https://gitlab.com/huangelina03/project-beta.git```
2. While in the project directory, run the following commands:
   ```
   docker volume create beta-data
   docker-compose build
   docker-compose up
   ```
3. Once the Docker containers are up and running (this may take a few moments), navigate to http://localhost:3000/ in your browser to begin interacting with the site.
---
## CRUD Route Documentation

### Inventory

#### Manufacturers
| HTTP Method | URL                                                 | Purpose                                  |
| ----------- | --------------------------------------------------- | ---------------------------------------- |
| POST        | http://localhost:8100/api/manufacturers/            | Create a new manufacturer                |
| GET         | http://localhost:8100/api/manufacturers/            | List all manufacturers                   |
| GET         | http://localhost:8100/api/manufacturers/ID/         | List details for a specific manufacturer |
| PUT         | http://localhost:8100/api/manufacturers/ID/         | Update a specific manufacturer's details |
| DELETE      | http://localhost:8100/api/manufacturers/ID/         | Delete a specific manufacturer           |

to create manufacturer POST this code into insomnia using JSON Body
```
{
  "name": "Chrysler"
}
```
It Should preview this after posting
```
{
	"href": "/api/manufacturers/1/",
	"id": 1,
	"name": "Chrysler"
}
```
Make one more manufacturer using post. Now use the GET to get the list of manufacturer. The preview would be similar to this.
```
{
	"manufacturers": [
		{
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Chrysler"
		},
		{
			"href": "/api/manufacturers/3/",
			"id": 2,
			"name": "Honda"
		}
	]
}
```

#### Vehicle Models
| HTTP Method | URL                                  | Purpose                                   |
| ----------- | ------------------------------------ | ----------------------------------------- |
| POST        | http://localhost:8100/api/models/    | Create a new vehicle model                |
| GET         | http://localhost:8100/api/models/    | List all vehicle models                   |
| GET         | http://localhost:8100/api/models/ID/ | List details for a specific vehicle model |
| PUT         | http://localhost:8100/api/models/ID/ | Update a specific vehicle model's details |
| DELETE      | http://localhost:8100/api/models/ID/ | Delete a specific vehicle model           |

to create vehicle models POST this code into insomnia using JSON Body
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
  "manufacturer_id": 1
}
```

Updating a vehicle model can take the name and/or picture URL
```
{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}
```
The preview should look like this

```
{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Chrysler"
  }
}
```
Getting a List of Vehicle Models
```
{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Chrysler"
      }
    }
  ]
}
```

#### Automobiles
| HTTP Method | URL                                        | Purpose                                   |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| POST        | http://localhost:8100/api/automobiles/     | Create a new automobile                   |
| GET         | http://localhost:8100/api/automobiles/     | List all automobiles                      |
| GET         | http://localhost:8100/api/automobiles/VIN/ | List details for a specific automobile    |
| PUT         | http://localhost:8100/api/automobiles/VIN/ | Update a specific automobile's details    |
| DELETE      | http://localhost:8100/api/automobiles/VIN/ | Delete a specific automobile              |

to create manufacturer POST this code into insomnia using JSON Body

```
{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}
```
The preview should look like this

```
{
	"href": "/api/automobiles/1C3CC5FB2AN120174/",
	"id": 1,
	"color": "red",
	"year": 2012,
	"vin": "1C3CC5FB2AN120174",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "430i",
		"picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "BMW"
		}
	},
    "sold": false
}
```
To get the details of a specific automobile, you can query by its VIN:
example url: http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

```
{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "green",
  "year": 2011,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Chrysler"
    }
  },
  "sold": false
}
```
You can update the color, year, and sold status of an automobile (SEND THIS JSON BODY)
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```
Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information
```
{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Chrysler"
        }
      },
      "sold": false
    }
  ]
}
```


### Automobile Sales

#### Salesperson

| HTTP Method | URL                                        | Purpose                                   |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| POST        | http://localhost:8090/api/salespeople/     | Create a salesperson                      |
| GET         | http://localhost:8090/api/salespeople/     | List salespeople                          |
| DELETE      | http://localhost:8090/api/salespeople/:id/ | Delete a specific salesperson             |

to create salesperson POST this code into insomnia using JSON Body
```
{
	"first_name": "John",
	"last_name": "Taylor",
	"employee_id": 5467
}
```

It Should preview this after posting
```
{
	"first_name": "John",
	"last_name": "Taylor",
	"employee_id": 5467,
	"id": 1
}
```
Make one more Salesperson using post. Make sure the employee_id is different the name can stay the same. Now use the GET to get the list of salespeople. The preview would be similar to this.
```
{
	"salespeople": [
		{
			"first_name": "John",
			"last_name": "Taylor",
			"employee_id": 5465,
			"id": 1
		},
		{
			"first_name": "John",
			"last_name": "Taylor",
			"employee_id": 5467,
			"id": 2
		}
	]
}
```
Use the Delete function and put in the Salesperson id number where it says :id in the endpoint. For example http://localhost:8090/api/salespeople/1/. It should preview this after.
```
{
	"message": "Delete successful"
}
```
#### Customer

| HTTP Method | URL                                        | Purpose                                   |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| POST        | http://localhost:8090/api/customers/       | Create a Customer                         |
| GET         | http://localhost:8090/api/customers/       | List Customers                            |
| DELETE      | http://localhost:8090/api/customers/id/    | Delete a specific Customer                |

to create customer POST this code into insomnia using JSON Body
```
{
	"first_name": "Tom",
	"last_name": "Brady",
    "address": "12 Tampa Dr",
	"phone_number": "9044872346"
}
```
It Should preview this after posting
```
{
	"first_name": "Tom",
	"last_name": "Brady",
	"address": "12 Tampa Dr",
	"phone_number": "9044872346",
	"id": 1
}
```
POST again to start getting a list of multiple customers. Next use GET to preview the list. It would look similar to this:
```
{
	"customers": [
		{
			"first_name": "Tom",
			"last_name": "Brady",
			"address": "12 Tampa Dr",
			"phone_number": "9044872346",
			"id": 1
		},
		{
			"first_name": "Jim",
			"last_name": "Reynolds",
			"address": "46 Sea Marsch Ln",
			"phone_number": "9049994444",
			"id": 2
		}
	]
}
```
Use the Delete function and put in the customer id number where it says :id in the endpoint. For example http://localhost:8090/api/customers/1/. It should preview this after.
```
{
	"message": "Delete successful"
}
```

#### Sales

| HTTP Method | URL                                        | Purpose                                   |
| ----------- | ------------------------------------------ | ----------------------------------------- |
| POST        | http://localhost:8090/api/sales/           | Create a sale                             |
| GET         | http://localhost:8090/api/customers/       | List sale                                 |
| DELETE      | http://localhost:8090/api/customers/id/    | Delete a specific sale                    |

to create sale POST this code into insomnia using JSON Body. Only do this after utilizing the customer, salesperson, and inventory to make use of the whole microservice.
```
{
	"automobile": "/api/automobiles/1C3CC5FB2AN120174/",
	"salesperson": 1,
	"customer": 1,
	"price": 44000
}
```
It should preview similar to this
```
{
	"automobile": {
		"import_href": "/api/automobiles/1C3CC5FB2AN120174/",
		"vin": "1C3CC5FB2AN120174",
		"sold": true
	},
	"salesperson": {
		"first_name": "John",
		"last_name": "Taylor",
		"employee_id": 5467,
		"id": 1
	},
	"customer": {
		"first_name": "Tom",
		"last_name": "Brady",
		"address": "12 Tampa Dr",
		"phone_number": "9044872346",
		"id": 1
	},
	"price": 44000,
	"id": 1,
	"salesperson_id": 1
}
```
Use the GET fucntion to get a list of all the sales. It should look somewhat similar to this.
```
{
	"sales": [
		{
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120174/",
				"vin": "1C3CC5FB2AN120174",
				"sold": false
			},
			"salesperson": {
				"first_name": "Bryce",
				"last_name": "Petty",
				"employee_id": "3456",
				"id": 1
			},
			"customer": {
				"first_name": "Jim",
				"last_name": "Way",
				"address": "34 Cowboys Blvd",
				"phone_number": "8375923957",
				"id": 1
			},
			"price": "44000.00",
			"id": 1,
			"salesperson_id": 1
		},
		{
			"automobile": {
				"import_href": "/api/automobiles/1C3CC5FB2AN120174/",
				"vin": "1C3CC5FB2AN120174",
				"sold": false
			},
			"salesperson": {
				"first_name": "Bryce",
				"last_name": "Petty",
				"employee_id": "3456",
				"id": 1
			},
			"customer": {
				"first_name": "Jim",
				"last_name": "Way",
				"address": "34 Cowboys Blvd",
				"phone_number": "8375923957",
				"id": 1
			},
			"price": "44000.00",
			"id": 2,
			"salesperson_id": 1
		}
	]
}
```
Use the Delete function and put in the sales id number where it says :id in the endpoint. For example http://localhost:8090/api/sales/1/. It should preview this after.
```
{
	"message": "delete successful"
}
```


## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

The sales microservice uses 4 models on the backend. These modes are AutomobileVO, Salesperson, Customer, and Sale. The sales microservice cannot be used without the other 3 models. You also need to make use of the inventory microservice to store info to make everything work. You make these two microservies interact by posting info into the inventory and in turn you can use that to make sales work. They do this by providing vechicle values to tell you which car is being sold.

The AutomobileVO is a value object that gets the data about the automobiles using a poller. It collects it from the inventory while using this method. The sales poller polls the inventory microservies data. When new data is entered the sales micro is updated.
