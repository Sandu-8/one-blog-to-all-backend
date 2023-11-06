<h1>Project setup</h1>
<h2>Create .env from remote.env</h2>

1. Create .env file in the root of the project
2. Get the values from remote.env and paste them in .env file

Example: 


PORT=3000\
DB_NAME=blog_app\
DB_USER=root\
DB_HOST=localhost\
DB_DRIVER=mysql\
DB_PASSWORD=password\
ACCESS_TOKEN_SECRET=asdkjaskdjbkasbcahdsbcjhd787e87834r43hehfh4ub34bhbj

<h4>Important: DB_DRIVER MUST BE MYSQL and you can add any ACCESS_TOKEN_SECRET for testing</h4>



3. Database must be empty because Sequelize will create tables automatically

<h2>Install dependencies</h2>
1. Run in the terminal: <b> npm install </b>

<h2> Run the project </h2>
1. Run in the terminal: <b>npm run start:dev</b>

