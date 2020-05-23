# Shopping Cart
This is a small project designed to showcase a simple shopping cart experience. The project is designed in three parts; the frontend (ReactJS), the backend (Java with Spring Boot) and the database (MongoDB). The code can be cloned from this git repository and with Docker you can launch it without any further dependencies. 

# Design and architecture
##Frontend
* ReactJS was chosen for the frontend because it is fast, responsive and has tools to manage state.
  * Within the ReactJS library, Redux was used to centralise state which is used by multiple components. This allows the state to be decoupled from components that are responsible for managing the view.

##Backend
* Java and Spring Boot was chosen for the backend to facilitate quicker development. There are many tools inside Spring Boot that allow getting started quickly.
  * Features include dependency injection and the Spring Data framework.
  * Spring Data contains Repository abstractions that allow boilerplate CRUD functionality to be defined through annotations and simple Java interfaces.
  * In addition, a not so familiar library called *Lombok* was used. This library automates the generation of boilerplate code such as constructors, getters/setters, etc. and works through annotations marked on POJO classes.
  
##Database
* MongoDB was chosen for the backend mainly because it is free and very flexible in terms of what it can store. Even the product images can be stored within the database. The product images are, however, stored on the frontend web server to allow faster load times when scaling up. However, complex object structures can be saved in MongoDB without requiring relational links between MongoDB Collections (known as tables in relational databases). An example of this is the Order collection (table, in relational database terminology). The Order collection consists of a one-to-many Order-to-Product relationship.



#### Improvements
* Actual user authentication with passwords. This was left out to simplify the implementation.
* Reduction of the stock once order has processed.
* Search functionality to be able to search for items from previous orders.
* More unit tests on the New Order Service class.
* Streamlined frontend design with Bootstrap and ReactJS features.

# Getting Started
### Pre-requisites
* Docker
  * https://docs.docker.com/get-docker/
* Git (optional as you can download the code directly from this website and unpack it)
  * https://git-scm.com/downloads
    * Or via homebrew (MacOSX): ```brew install git```   
* A solid internet connection!

### Running the application
1. ```git clone https://github.com/arslanz/market.git``` 
2. ```cd market```
3. ```docker-compose up```

### Using the application
1. Go to http://localhost:3000
2. Enter a username, click *Sign in*
3. Initially, you will be prompted to create the username ( since no users exist)
4. After user is created, click *Sign in*
5. From the top, click the *Products* tab
6. Choose items to add to the cart
7. From the top-right, click the *My Cart* tab
8. Review your cart items and update quantity as needed
9. Once ready, click the *Checkout* button
10. After a confirmation popup, an Order Summary will be displayed and the Cart contents will be cleared
11. Click the *Close* button to return to the Cart
12. Go to the *Orders* tab to view previous orders
13. Click the *Order Id* link to open the Order Summary for the selected previous order
14. Click the top-right *Sign out* button once ready to exit or to Sign in as a different user

### Running locally
### Frontend code
The frontend code is in the ```./frontend``` folder. To run the code you will need to install node.
* https://nodejs.org/en/
  * Or via homebrew (MacOSX): ```brew install node```

To launch the code:
* cd ./frontend
* Modify: ./package.json proxy:
  * from: ```"proxy": "http://backend:8080",```
  * to: ```"proxy": "http://localhost:8080",```
* npm install
* npm start  

### Backend code
The backend code is in the ```./backend``` folder. To run the code you will need Maven, Java and an IDE is optional.
* https://maven.apache.org/download.cgi
  * Or via homebrew (MacOSX): ```brew install maven```
* https://www.oracle.com/java/technologies/javase-jdk8-downloads.html
  * Or via homebrew (MacOSX): ```brew install adoptopenjdk8```
* https://www.jetbrains.com/idea/download/
  * Or via homebrew (MacOSX): ```intellij-idea-ce```
   
To launch the code:
* cd ./backend
* Modify: ./src/main/resources/application.properties database host from:
  * from: ```spring.data.mongodb.host=db```
  * to: ```spring.data.mongodb.host=localhost```
* ```mvn clean install```
* ```java -jar ./target/market-backend-1.0.0.jar```

### Database
The database specific files, such as the initial data for the Products, are stored in the ```./database``` folder. The database initial dataset is in a csv located in ```./initial-data/```. It is recommended to use the database through the Docker container which you can bring up using the ```docker-compose up``` mentioned above. However, should you actually need to install the database locally:

1. https://docs.mongodb.com/guides/server/install/
2. Once installed, make sure the mongod daemon is running
3. Import the data using this command:
```mongoimport --db=MarketDB --collection=Product --type=csv --headerline --file=./database/initial-data/collection_product.csv```
