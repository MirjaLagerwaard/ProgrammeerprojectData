import csv
import json
from string import find

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

def calc_degrees(degrees, minutes, seconds):
    return str(int(degrees) + float(minutes) / 60.0 + float(seconds) / 3600.0)

def convert(s):
    s_first = s[:2]

    location_and = find(s, "&")
    s_second = s[4:location_and]

    location_semi = find(s[location_and:], ";") + location_and
    location_second_and = find(s[location_semi:], "&")

    if location_second_and == -1:
        location_second_and = find(s[location_semi:], "N")

    if location_second_and == -1:
        location_second_and = find(s[location_semi:], "E")

    if location_second_and == -1:
        s_third = s[location_semi + 1:]
    else:
        s_third = s[location_semi + 1: location_second_and + location_semi]

    return calc_degrees(s_first, s_second, s_third)

def convert2(s):
    s_first = s[:2]

    weird_thing = find(s, '\xe2')

    s_second = s[4:weird_thing]

    another_thing = find(s, '\xb2')

    second_weird_thing = find(s[another_thing:], '\xe2') + another_thing

    s_third = s[another_thing + 1: second_weird_thing]

    return calc_degrees(s_first, s_second, s_third)

reader = csv.reader(csvfiletotal)

result = {}
count = 0

for row in reader:
    if row[4][-2:] == '16':
        if "&#39;" in row[2]:
            row[2] = convert(row[2])
        if "&#39;" in row[3]:
            row[3] = convert(row[3])
        if "N" == row[2][-1:] and row[3][2] != ".":
            row[2] = convert2(row[2])
        if "E" in row[3] and row[3][2] != ".":
            row[3] = convert2(row[3])
        if "N" == row[2][-1:]:
            row[2] = row[2][:-1]
        if "E" == row[3][-1:]:
            row[3] = row[3][:-1]

        result[count] = row
        count += 1

# make dictionary for the json
points_dict = result

# make the json file
json.dump(points_dict, jsonfile)
