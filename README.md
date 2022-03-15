Commands:

1. virtualenv venv
2. source venv/bin/activate
3. pip install -r requirements.txt
4. python manage.py

# Data Generation

Navigate to the `Datagen` folder to run a node script that loads sample data to your MongoDB cluster.
## Install dependencies

`npm i`

## Configure connection string

1. Copy or rename `sample.env` to `.env` 
2. Change the value of the connection string to point to your cluster using the following format: `mongodb+srv://<username>:<password>@<hostname>`

## Run node script

`node index.js`