# Refugee Management Platform
Many grassroot organization help Ukrainian refugees travel from Ukraine to hosting countries. Each refugee/refugee family gets assigned a “case”, and the volunteers work on these cases to help refugees safely reach their destinations. Volunteers/case workers search existing “resources” to help the refugees in different stages of their relocation journey. This application makes case managament simpler by matching resources with refugees to help reduce time spent searching for appropriate resources by the volunteers. 
## Landing Page
![image](https://user-images.githubusercontent.com/38090804/159810124-5ed809e3-4e39-483a-83ec-f358629253f7.png)

## Case View Page
![image](https://user-images.githubusercontent.com/38090804/159810108-0c4e7017-2fef-48aa-86a3-2a917a803062.png)


## To Run the Flask App:

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
