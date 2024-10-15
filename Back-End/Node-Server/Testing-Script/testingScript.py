import bcrypt

def hash_and_compare(password, stored_hash):
    # Hash with 10 salt rounds
    hash_10 = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
    match_10 = bcrypt.checkpw(password.encode(), stored_hash.encode())

    # Hash with 12 salt rounds
    hash_12 = bcrypt.hashpw(password.encode(), bcrypt.gensalt(12))
    match_12 = bcrypt.checkpw(password.encode(), stored_hash.encode())

    return hash_10, match_10, hash_12, match_12

# Test password and stored hash from database
test_password = 'your_test_password'
stored_hash = 'stored_hash_from_database'

# Perform the test
hash_10, match_10, hash_12, match_12 = hash_and_compare(test_password, stored_hash)
print("Hash with 10 rounds:", hash_10)
print("Match with 10 rounds:", match_10)
print("Hash with 12 rounds:", hash_12)
print("Match with 12 rounds:", match_12)
