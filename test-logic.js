const fs = require('fs');

try {
    // Halimbawa: I-check natin kung valid ang index.html
    const html = fs.readFileSync('index.html', 'utf8');

    // LOGIC: Kung walang <body> tag, ituturing nating "Mali" ang code.
    if (!html.includes('<body')) {
        console.error("❌ ERROR: Missing <body> tag! Update Rejected.");
        process.exit(1); // AUTOMATIC REJECT
    }

    // LOGIC: Kung may salitang "DEBUG", i-reject din (bawal sa production).
    if (html.includes('DEBUG')) {
        console.error("❌ ERROR: Debug code found! Update Rejected.");
        process.exit(1); // AUTOMATIC REJECT
    }

    console.log("✅ test passed: Code is valid.");
    process.exit(0); // AUTOMATIC ACCEPT

} catch (err) {
    console.error("❌ ERROR: File not found or corrupted.");
    process.exit(1);
}