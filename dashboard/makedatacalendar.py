import csv
import json
import copy

# open the needed files
csvfiletotal = open('syrianarchive.csv', 'r')

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

result = {}

for row in reader:
    if row["date"][-2:] == '12':
        date = row["date"]
        typeViolation = row["typeofviolation"]
        short = translateDict[typeViolation]

        if date in result:
            result[date][short] += 1
        else:
            result[date] = copy.deepcopy(amountofviolation)
            result[date][short] += 1

for date, amounts in result.iteritems():
    amounts["Total"] = sum([value for key, value in amounts.iteritems()])

with open('calendardata2012.csv', 'wb') as f:
    total = ['date']
    total.extend(result.values()[0].keys())

    w = csv.DictWriter(f, total)

    w.writeheader()
    for date, amounts in result.iteritems():
        amounts["date"] = date[-4:] + date[3:5] + date[:2]
        w.writerow(amounts)
