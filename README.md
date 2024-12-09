# Project Setup and Database Management Guide - Dura-Europos Generous Interface

## Prerequisites
- Install pip (Python package manager)
- Install npm (Node.js package manager)
- Install an SQLite viewer (recommended: SQLite Explorer) for database inspection

## Database Setup and Updates

### Initial File Preparation
1. Convert all XLS files to CSV format before processing

### Database Update Process
1. Remove current database CSV file in `api/database` directory and add new database CSV file instead
2. Update the CSV filename reference in `api/database/db_operations.py`
3. Execute following commands:
```bash
cd api
python3 db_creation.py    # Clear current database
python3 db_operations.py  # Load new data
```
After running these commands, `dura.sqlite` should be updated with the new data.

## Running the Application

### Starting the Application (updated-generous-interface-dec-2024)
1. Split terminal into two windows
2. Start the backend:
   ```bash
   cd api
   python3 runserver.py   # Use 'python runserver.py' on non-Mac systems
   ```
3. Start the frontend:
   ```bash
   cd client
   npm run dev
   ```
4. Access the interface at: http://localhost:3000

## Database Files Overview

### Main Data Files
1. **1008_corrected_scrape(1).xlsx**
   - Original spreadsheet with items uploaded to Wikidata
   - Current query system uses accession and negative_numbers for Wikidata queries
   - Note: object_type column is empty in this file

2. **new_db.xlsx**
   - Subset of items from 1008_corrected_scrape file
   - Contains completed type column for included items

3. **items_not_included_from_corrected_scrape.csv**
   - Contains remaining items from 1008_corrected_scrape not included in new_db
   - To include these items, type and location columns must be completed

## Object Type Script Documentation (optional - download as separate project and open in new window when running)

### Purpose and Usage
The object_type_script helps determine artifact types for database entries. This is helpful because:
- Items are grouped by type for user display
- The object_type column in corrected_scrape database is empty
- Manual completion of the type column is required for image display (with currentt interface implementation)

### Running the Object Type Script
1. Update the database following the previously noted steps (above)
2. Run the script:
   ```bash
   cd api/database
   python3 object_type_operation.py
   ```

### Script Output and Manual Process
- The script creates a CSV file with information helpful for determining item types
- Information sources for determining item types:
  - Script-generated CSV data
  - Wikidata (using accession or negative number)
  - Wiki Commons (using upload_fname)
  - Description column in database (when sufficient)
- Note: Using the script is optional but can assist in the manual process of type determination
