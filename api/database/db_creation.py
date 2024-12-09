import sqlite3
import os

db_name = "./dura.sqlite"

# Check if database file exists and remove it if present
if os.path.exists(db_name):
    os.remove(db_name)
    print("Database deleted successfully")
else:
    print("Database does not exist")

# Create a new database and objects table
sql_cmd = '''
CREATE TABLE IF NOT EXISTS objects (
    id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
    object_id INTEGER NOT NULL,
    name VARCHAR NOT NULL,
    link VARCHAR NOT NULL,
    image_link VARCHAR NOT NULL,
    location_label VARCHAR NOT NULL,
    location_name VARCHAR NOT NULL,
    type VARCHAR NOT NULL,
    accession VARCHAR,
    negative_number VARCHAR,
    image_source VARCHAR,
    image_type VARCHAR
);
'''

# TABLE IF NOT EXISTS objects (
# #     id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,
# #     object_id INTEGER NOT NULL,
# #     name VARCHAR NOT NULL,
# #     location_label VARCHAR NOT NULL,
# #     location_name VARCHAR NOT NULL,
# #     type VARCHAR NOT NULL,
# #     accession VARCHAR,
# #     negative_number VARCHAR,
# #     upload_fname VARCHAR NOT NULL
# # );

# Open cursor and connection
conn = sqlite3.connect(db_name)
cur = conn.cursor()

# Execute SQL command to create the table
cur.execute(sql_cmd)

# Close cursor and connection
cur.close()
conn.close()
