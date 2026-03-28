const fs = require('fs');

try {
    const html = fs.readFileSync('index.html', 'utf8');

    let errors = [];

    // Check if <body> exists
    if (!html.includes('<body')) {
        errors.push("Missing <body> tag");
    }

    // Check if <title> exists
    if (!html.includes('<title')) {
        errors.push("Missing <title> tag");
    }

    // Check for DEBUG keyword
    if (html.includes('DEBUG')) {
        errors.push("Debug code found");
    }

    // Check unclosed <a> tags
    const openATags = (html.match(/<a\b[^>]*>/g) || []).length;
    const closeATags = (html.match(/<\/a>/g) || []).length;

    if (openATags !== closeATags) {
        errors.push("Unclosed <a> tag");
    }

    // FINAL RESULT
    if (errors.length > 0) {
        console.error("❌ UPDATE REJECTED");
        errors.forEach(err => console.error("- " + err));
        process.exit(1);
    }

    console.log("✅ All tests passed");
    process.exit(0);

} catch (err) {
    console.error("❌ File error");
    process.exit(1);
}