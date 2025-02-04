import csv
import uuid
import random

# Configuration parameters
NUM_RECORDS = 1000000
OUTPUT_FILE = "mock_accounts.csv"
ACCOUNT_TYPES = ['cash', 'savings', 'checking', 'investment']
CURRENCIES = ['RMB', 'USD', 'EUR', 'GBP', 'JPY']

def generate_account_data(num_records):
    """Generate account data"""
    for _ in range(num_records):
        yield {
            "accountId": str(uuid.uuid4()),  # Generate unique UUID
            "balance": round(random.uniform(0, 10000), 2),  # Generate amount between 0-10000, rounded to 2 decimal places
            "accountType": random.choice(ACCOUNT_TYPES),
            "currency": random.choice(CURRENCIES)
        }

# Generate and write to CSV file
with open(OUTPUT_FILE, 'w', newline='') as csvfile:
    fieldnames = ['accountId', 'balance', 'accountType', 'currency']
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()

    # Display generation progress
    for i, row in enumerate(generate_account_data(NUM_RECORDS)):
        writer.writerow(row)
        if (i+1) % 1000 == 0:
            print(f"Generated {i+1}/{NUM_RECORDS} records...")

print(f"\nGeneration complete! File saved to: {OUTPUT_FILE}")

# Simple mock data generation script, practical and easy to use.