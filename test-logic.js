const fs = require('fs');
const validator = require('html-validator');

try {
    const html = fs.readFileSync('index.html', 'utf8');

    if (!html.includes('<body')) {
        console.error("❌ Missing <body> tag");
        process.exit(1);
    }

    if (html.includes('DEBUG')) {
        console.error("❌ Debug code found");
        process.exit(1);
    }

    // NEW: HTML VALIDATION
    const options = {
        data: html,
        format: 'text'
    };

    validator(options)
        .then(data => {
            if (data.includes('Error')) {
                console.error("❌ HTML structure error detected");
                console.error(data);
                process.exit(1);
            } else {
                console.log("✅ test passed: HTML is valid");
                process.exit(0);
            }
        })
        .catch(err => {
            console.error("❌ Validator error:", err);
            process.exit(1);
        });

} catch (err) {
    console.error("❌ File error");
    process.exit(1);
}