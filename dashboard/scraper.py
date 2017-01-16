#!/usr/bin/env python
# Name: Mirja Lagerwaard
# Student number: 10363149

'''
TODO
'''
import csv

from pattern.web import URL, DOM
import pattern.web as web

TARGET_URL = "https://syrianarchive.org/database/?page="
INCIDENT_URL = "https://syrianarchive.org"
BACKUP_HTML = 'syrianarchive.html'
OUTPUT_CSV = 'syrianarchive.csv'
PAGES = 77

def extract_incidents(dom):
    """
    TODO
    """

    incident_list = []
    i = 0

    print dom.by_tag('tr')

    for incident in dom.by_tag('tr'):
        if i > 0:
            link = INCIDENT_URL + incident.by_tag('a')[0].href

            url = URL(link)
            html = url.download(timeout=100)
            dom_incident = DOM(html)

            weapons = [weapon.strip() for weapon in dom_incident.by_tag('p')[16].content[27:].split('<br />')]
            weapons = ", ".join(weapons)[:-2]
            latitude = dom_incident.by_tag('p')[2].content[33:].strip()
            longitude = dom_incident.by_tag('p')[3].content[34:].strip()

            description = incident.by_tag('div')[0].content[1:].strip()
            date = incident.by_tag('td')[2].content[1:].strip()
            location = incident.by_tag('td')[3].content[1:].strip()
            violation = incident.by_tag('td')[4].content[1:].strip()
            incident_list.append([link.encode('utf-8'), location.encode('utf-8'), latitude.encode('utf-8'), longitude.encode('utf-8'), date.encode('utf-8'), violation.encode('utf-8'), weapons.encode('utf-8'), description.encode('utf-8')])

        i += 1

    return incident_list

def save_csv(f, incidents):
    '''
    TODO
    '''
    writer = csv.writer(f)
    writer.writerow(['link', 'wapons', 'description', 'date', 'location', 'violation'])

    for row in incidents:
        writer.writerow(row)

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL + '1')
    html = url.download(timeout=100)

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    incidents = []
    for i in range(1, PAGES + 1):
        url = URL(TARGET_URL + str(i))
        html = url.download(timeout=100)
        dom = DOM(html)

        # Extract the tv series (using the function you implemented)
        incidents += extract_incidents(dom)
        # print incidents
        print i

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, incidents)
