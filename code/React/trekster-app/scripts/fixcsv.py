import csv

with open('../public/matched_data.csv', 'r') as f:
    reader = csv.reader(f)
    rows = list(reader)

uniqueRows = set()

with open('../public/output.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    for row in rows:
        if row[1] not in uniqueRows:
            writer.writerow(row)
            uniqueRows.add(row[1])
