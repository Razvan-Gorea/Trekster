import json
import requests
import csv

# This script does one thing:
# Match, using python a set of coordinates (from geometry json dump) -> trail data (trail heads are different coordinates)
# It basically rounds coordinates and then matches them to each other.

with open('lines.json', 'r') as f:
    lines_data = json.load(f)
    print("Loaded JSON")

response = requests.get('http://127.0.0.1:8000/trails/')
trails = response.json()
print("Got response!")
print(len(trails))
matches = []
round_factor = 3
count = 0
for index, feature in enumerate(lines_data['features']):
   # We have to treat the coordinate arrays which are made up of more arrays differently, so we distinguish them here.
   # This just simply prints them so we can see them loaded.
   if isinstance(feature['geometry']['coordinates'][0][0], list):
      print(index, [round(feature['geometry']['coordinates'][0][0][0], 3), round(feature['geometry']['coordinates'][0][0][1], 3)])
   else:
      print(index, [round(feature['geometry']['coordinates'][0][0], 3), round(feature['geometry']['coordinates'][0][1], 3)])

# Main for loop, this is the logic
for index, feature in enumerate(lines_data['features']):
   flag = False
   # Itterates over all features (1029)
   for coordinates in feature['geometry']['coordinates']:
      if isinstance(coordinates[0], list):
         jsontrail = [round(coordinates[0][0], round_factor), round(coordinates[0][1], round_factor)]
         for trail in trails:
            # After defining the trail inside the json file, then tries to match it to one of the trails from our database
            localtrail = [round(trail['x'], round_factor), round(trail['y'], round_factor)]
            if jsontrail == localtrail:
               print("Coords: ", jsontrail, "matches with ", jsontrail)
               count += 1
               matches.append({
                  'feature_index': index,
                  'TrailID': trail['TrailID']
                  })
               flag = True
               break
      if isinstance(coordinates[0], float):
         jsontrail = [round(coordinates[0], round_factor), round(coordinates[1], round_factor)]
         for trail in trails:
            localtrail = [round(trail['x'], round_factor), round(trail['y'], round_factor)]
            if jsontrail == localtrail:
               print("Coords: ", jsontrail, "matches with ", jsontrail)
               count += 1
               matches.append({
                  'feature_index': index,
                  'TrailID': trail['TrailID']
                  })
               flag = True
               break
      if flag == True:
         break

# Puts them in a csv file with two columns to match index in the json array to trail data
print("Done!", " matches = ", count)
with open('matched_data.csv', 'w', newline='') as csvfile:
    fieldnames = ['feature_index', 'TrailID']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for match in matches:
        writer.writerow(match)
