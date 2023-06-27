<div align="center">
<img width="300" alt="nourish_logo" src="https://github.com/nourish-team/nourish-frontend/assets/114712265/3eb85d69-f70d-4994-89a5-638a53f3194d">
</div> 

# nourish

## Table of Contents
1. [Intro](##Intro):
    - About the project
    - Features
    - Technologies Used
2. [Getting Started](##GettingStarted):
    - Prerequisites
    - Installation
3. Basic Outline
    - APIs & Data
4. License
5. Contributing
6. Contact
7. Acknowledgments

## Intro
Nourish is a skincare tracking app designed to empower users in their skincare journey. 
Our goal is to provide a platform where users can journal and monitor the effectiveness of their skincare routine, helping them identify what products and combinations work best for them.

### About the project

With nourish, users can easily create their personalized skincare routine by searching for products by brand and adding them to their routine. 
To enhance customization, users have the option to include tags that describe the targeted skin type and the preferred weather conditions for the routine.

Once a routine is created, users can journal about their experiences by adding journal entries and even uploading photos of their skin.
These journal entries are stored in the user's history, allowing them to track progress and observe any changes over time.

In addition to personal tracking, nourish enables users to explore and engage with the routines of others. Users can browse through a collection of routines and like them.
Liked routines are conveniently saved for future reference, providing inspiration and allowing users to implement ideas from other skincare enthusiasts.

Nourish aims to be a comprehensive companion for skincare enthusiasts, fostering a community where users can learn from one another and make informed decisions about their skincare routine.

### Features 

- User registration, login, and authentication using Firebase
- Create and manage multiple skincare routines
- Add products to routines with product details
- Journal and view journal entries
- Discover other users' skincare routines by filtering
- Integrating an API to display real-time weather information

### Technologies Used

- ![Node.js](https://img.shields.io/badge/Node-white?logo=nodedotjs&logoColor=339933)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-black?logo=express&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/PostgresSQL-4169E1?logo=postgresql&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-white?logo=prisma&logoColor=2D3748)
- ![Heroku](https://img.shields.io/badge/Heroku-430098?logo=heroku&logoColor=white)


## Getting Started

### Prerequisites
To be able to use this application you have to make use of PostgresSQL version 12.14 or higher, and Node.js version 16.8 or later.

You can check your version by running the following commands in your terminal:

```sh
node --version
```
```sh
postgres --version
```


### Installation

_Below you will find the basic installation and set up._

1. Clone the repo
```sh
git clone https://github.com/your_username_/Project-Name.git
```
2. Module Installation
```sh
npm install
```
3. Creating a database with Postgres
   
  - Mac:
  ```sh
  psql postgres
  ```
  - Windows: 
  ```sh
  psql -U postgres
  ```
4. put the following in your .env file

```sh
DATABASE_URL=postgresql://yourname:yourpassword@localhost:5432/nameofyourdatabase
```

5. Run migartions

```sh
npx prisma migrate dev
```

6. In case it didn't seed automatically after running migrations
   
```sh
npx prisma db seed
```

## Basic Outline

### APIs & Data

The major APIs we used where: 
   
- ![Firebase](https://img.shields.io/badge/Firebase-blue?logo=react) :
  
Firebase is a Backend as a Service (BaaS) platform provided by Google. It offers a range of services and tools that aid in app development, such as user authentication, real-time database, cloud storage, and cloud messaging. 
In this particular case, we used Firebase for user authentication, ensuring that users can securely register and log in to safeguard their data.

- Seeding skincare data:

Since free skincare APIs are hard to come by, we seeded our database with the data provided by [Laura Robertson](https://github.com/LauraRobertson/skincareAPI). Without this data this project was not possible in two weeks’ time. 

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! If you would like to contribute to nourish, please follow these steps:

1. Fork the Project
2. Create your Feature Branch (git checkout -b feature/newSexyFeature)
3. Commit your Changes (git commit -m 'Add some newSexyFeature')
4. Push to the Branch (git push origin feature/newSexyFeature)
5. Open a Pull Request

## Contact

- Anissa Chadouli [Anissa3005](https://github.com/Anissa3005)
- Lisa Tan [oddpharmacy](https://github.com/oddpharmacy)
- Asako Ueno [asa-U](https://github.com/asa-U)
- Sean McKay [shonancanuck](https://github.com/shonancanuck)
- Gee Chai [FefesG5](https://github.com/FefesG5)

## Acknowledgments

- [Shields.io](https://shields.io/)
  
