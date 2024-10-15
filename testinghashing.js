const bcrypt = require('bcryptjs');

const plaintextPassword = "password123";

bcrypt.hash(plaintextPassword, 12, (err, hash) => {
    if (err) throw err;
    console.log("Generated hash:", hash);
    bcrypt.compare(plaintextPassword, hash, (err, isMatch) => {
        if (err) throw err;
        console.log("Do they match?:", isMatch);  // Should be true
    });
});
