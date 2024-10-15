const bcrypt = require('bcryptjs');

const testPassword = 'Ranjan123';
const storedHash = '$2a$12$oP0GGJcsuGL3UctzlLSEnOOtFjCXg5FwnifewGfxHvvY5MkyCYLTa';

bcrypt.hash(testPassword, 12, function(err, hash) {
    if (err) {
        console.error('Error hashing:', err);
    } else {
        console.log('Generated hash:', hash);
        bcrypt.compare(testPassword, storedHash, function(err, isMatch) {
            if (err) {
                console.error('Error comparing:', err);
            } else {
                console.log('Is match:', isMatch);
            }
        });
    }
});
