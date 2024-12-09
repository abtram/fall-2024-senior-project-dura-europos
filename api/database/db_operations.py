'''
Provide functions for inserting or querying database
'''
import sqlite3
import csv

DB_NAME = "./dura.sqlite"

# Insert row into database table
def db_insert(values):
    # Open cursor and connection
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    sql_cmd = "INSERT INTO objects(object_id, name, link, image_link, location_label, location_name, type, accession, negative_number, image_source, image_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    cur.execute(sql_cmd, values)
    conn.commit()

    # Close cursor and connection
    cur.close()
    conn.close()

# Insert all rows in csv file to database
def csv_insert():
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    # # Delete all rows in the 'objects' table
    # cur.execute("DELETE FROM objects")
    # conn.commit()

    with open('Book1.csv', 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        for row in reader:
            db_insert(tuple(row))

    cur.close()
    conn.close()

# Query rows in database by location
def get_rows_with_loc(location):
    # Open cursor and connection
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    sql_cmd = "SELECT * FROM objects WHERE location_label = ?"
    cur.execute(sql_cmd, (location,))
    rows = cur.fetchall()

    # Close cursor and connection
    cur.close()
    conn.close()

    return rows

# Query rows in database by location and type
def get_rows_with_type(location, type):
    # Open cursor and connection
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    sql_cmd = "SELECT * FROM objects WHERE type = ? AND location_label = ?"
    cur.execute(sql_cmd, (type, location))
    rows = cur.fetchall()

    # Close cursor and connection
    cur.close()
    conn.close()

    return rows

if __name__ == "__main__":
    csv_insert()