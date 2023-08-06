#pip3 install Faker
from faker import Faker
from faker.providers import address
import pyodbc
import json

with open('./config.json', 'r') as fh:
    config = json.load(fh)

DRIVER_NAME = config['DRIVER']
SERVER_NAME = config['SERVER']
DATABASE_NAME =config['DATABASE']

connectionStr = (
    r'DRIVER={};'
    r'SERVER={};'
    r'DATABASE={};'
    r'Trusted_Connection=yes;'
).format(DRIVER_NAME, SERVER_NAME, DATABASE_NAME)

connection = pyodbc.connect(connectionStr)
cursor = connection.cursor()
def genEmp(cursor):
    faker = Faker('en_US')
    faker.add_provider(address)
    #number of fake employee
    totalEmployees = 100

    def eraseTitle(fullname):
        #Erase the title
        if '.' in fullname:
            fullname = fullname.split()
            fullname.pop(0)
        else:
            fullname = fullname.split()
        return fullname

    def getFirstandLast(fullname):
        #extract first and last name
        first = fullname[0]
        #incase it has middle name
        if(len(fullname) == 3):
            last = fullname[2]
        else:
            last = fullname[1]
        return first,last


    x = {"initial":[],"count":[]}
    payRate = float(22.5)
    for i in range(1,totalEmployees+1):
        #get name, email
        num = int(faker.unique.numerify('######'))
        zipcode = faker.unique.numerify('#####')
        fullname = eraseTitle(faker.name())
        first,last = getFirstandLast(fullname)
        initial = first[0] + last[0]
        if(initial in x):
            x[initial] += 1
        else:
            x[initial] = 1
        #add the first infos
        email = first[0] + last[0] + str(x[initial]) + "@example.com"
        #Add it to the tutor
        email = email.lower()
        password = last + str(num)
        
        address1 = faker.street_address()
        city = faker.city()
        state = faker.state()
        zipcode = faker.postcode()
        cursor.execute('''SET IDENTITY_INSERT workers ON
                    INSERT INTO workers(firstName, lastName, username, id, password, email, payRate, address1, city, state, zipcode)
                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''', 
                    (first, last, num, num, password, email, payRate, address1, city, state, zipcode))
    cursor.commit()
def testConnection(cursor):
    rows = cursor.execute('''SELECT TOP 10 * FROM workers''')
    for row in rows:
        print(row)

#genEmp(cursor)
testConnection(cursor)