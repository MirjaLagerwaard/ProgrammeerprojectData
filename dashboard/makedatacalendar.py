import csv
import json

# open the needed files
csvfiletotal = open('syrianarchive.csv', 'r')
jsonfile = open('data2016calendar.csv', 'w')

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

reader = csv.DictReader(csvfiletotal, fieldnames)

# Maak dict van type violation [type: 0] waar je 0 gaat optellen voor iedere violation die van een bepaald type is
amountofviolation = {'ACCFRA':0, 'UOIW':0, 'UA':0, 'SPPAO':0, 'SAESCR':0, 'VOCR':0, 'AAFD':0, 'Other':0, 'None':0}
translateDict = {'Alleged civilian casualties from Russian attacks':'ACCFRA',
                    'Use of illegal weapons':'UOIW',
                    'Unlawful attacks':'UA',
                    'Specifically protected persons and objects':'SPPAO',
                    'Sieges and economic, social and cultural rights':'SAESCR',
                    'Violation of children&#39;s rights':'VOCR',
                    'Arbitrary and forcible displacement':'AAFD',
                    'Other':'Other',
                    'None':'None'}

result = []

for row in reader:
    if row["date"][-2:] == '16':
        date = row["date"]
        typeViolation = row["typeofviolation"]
        short = translateDict[typeViolation]
        amountofviolation[short] += 1
        new_dict = {}
        new_dict = date[short]
        print new_dict

print amountofviolation
#
# for key, value in amountofviolation.iteritems():
#     result.append({"date":key, "typeViolation":str(value)})
# # make dictionary for the json
# points_dict = {'data': result}
# # make the json file
# json.dump(points_dict, jsonfile)
