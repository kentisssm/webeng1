const { execSync } = require('child_process');

let hasError = false;

function runCommand(command, label) {
    try {
        console.log(`\n🔍 Running ${label}...\n`);
        execSync(command, { stdio: 'inherit' });
    } catch (err) {
        hasError = true;
        console.error(`\n❌ ${label} FAILED\n`);
    }
}

runCommand('node tests/test-logic.js', 'Custom Tests');
runCommand('npx htmlhint "**/*.html"', 'HTML Validation');
runCommand('npx eslint "**/*.js"', 'JS Validation');

if (hasError) {
    console.error("\n❌ UPDATE REJECTED: Errors detected above.\n");
    process.exit(1);
} else {
    console.log("\n✅ ALL TESTS PASSED\n");
    process.exit(0);
}