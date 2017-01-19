#!/usr/bin/env python
# Name: Mirja Lagerwaard
# Student number: 10363149

import csv
import json

# open the needed files
csvfile = open('testdatacalendar.csv', 'r')
jsonfile = open('testdatacalendar.json', 'w')

# define fieldnames
fieldnames = (
        "date",
        "amount")

reader = csv.DictReader(csvfile, fieldnames)

# make array points
points = []

# store the data points in array points
for row in reader:
    points.append(row)

# make dictionary for the json
points_dict = {'data' : points}
# make the json file
json.dump(points_dict, jsonfile)
