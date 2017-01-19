import csv
import json

# open the needed files
csvfiletotal = open('syrianarchive.csv', 'r')
jsonfile = open('mapdata2016.json', 'w')

# define fieldnames
fieldnames = (
        "link",
        "location",
        "latitude",
        "longitude",
        "date",
        "typeofviolation",
        "weapons",
        "description")

reader = csv.reader(csvfiletotal)

result = {}
count = 0

for row in reader:
    if row[4][-2:] == '16':
        result[count] = row
        count += 1

# make dictionary for the json
points_dict = result

# make the json file
json.dump(points_dict, jsonfile)
