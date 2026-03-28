const fs = require('fs');

try {
    const html = fs.readFileSync('index.html', 'utf8');

    let errors = [];

    // RULE 1
    if (!html.includes('<body')) {
        errors.push("Missing <body> tag");
    }

    // RULE 2
    if (html.includes('DEBUG')) {
        errors.push("Debug code found");
    }

    // RULE 3
    const openATags = (html.match(/<a\b[^>]*>/g) || []).length;
    const closeATags = (html.match(/<\/a>/g) || []).length;

    if (openATags !== closeATags) {
        errors.push("Unclosed <a> tag");
    }

    // RULE 4
    if (!html.includes('<title')) {
        errors.push("Missing <title> tag");
    }

    // 🔥 FINAL DECISION
    if (errors.length > 0) {
        console.error("❌ UPDATE REJECTED");
        console.error("Errors found:");

        errors.forEach(err => {
            console.error("- " + err);
        });

        process.exit(1);
    }

    console.log("✅ All tests passed!");
    process.exit(0);

} catch (err) {
    console.error("❌ File error!");
    process.exit(1);
}