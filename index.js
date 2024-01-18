const fs = require('fs');
const csv = require('csv-parser');

// Check if canada.txt and usa.txt already exist, and delete them
['canada.txt', 'usa.txt'].forEach(file => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
    }
});

// Read input_countries.csv and filter data for Canada and United States
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country.toLowerCase() === 'canada') {
            // Write data to canada.txt
            fs.appendFileSync('canada.txt', `${row.country},${row.year},${row.population}\n`);
        } else if (row.country.toLowerCase() === 'united states') {
            // Write data to usa.txt
            fs.appendFileSync('usa.txt', `${row.country},${row.year},${row.population}\n`);
        }
    })
    .on('end', () => {
        console.log('Processing completed.');
    });
