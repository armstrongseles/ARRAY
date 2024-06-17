// Function to fetch data from the REST Countries API
async function fetchCountriesData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        performArrayMethods(countries);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to perform the required array methods
function performArrayMethods(countries) {
    // a. Get all the countries from Asia continent/region using Filter method
    const asianCountries = countries.filter(country => country.region === 'Asia');
    console.log('Asian Countries:', asianCountries);

    // b. Get all the countries with a population of less than 2 lakhs using Filter method
    const smallPopulationCountries = countries.filter(country => country.population < 200000);
    console.log('Countries with population less than 2 lakhs:', smallPopulationCountries);

    // c. Print the following details name, capital, flag, using forEach method
    console.log('Country details (name, capital, flag):');
    countries.forEach(country => {
        console.log(`Name: ${country.name.common}, Capital: ${country.capital}, Flag: ${country.flags[0]}`);
    });

    // d. Print the total population of countries using reduce method
    const totalPopulation = countries.reduce((total, country) => total + country.population, 0);
    console.log('Total Population:', totalPopulation);

    // e. Print the country that uses US dollars as currency
    const usdCountries = countries.filter(country => {
        if (country.currencies) {
            return Object.keys(country.currencies).includes('USD');
        }
        return false;
    });
    console.log('Countries using USD as currency:', usdCountries);

    // Displaying results in the HTML
    displayResults(asianCountries, smallPopulationCountries, countries, totalPopulation, usdCountries);
}

// Function to display results in the HTML
function displayResults(asianCountries, smallPopulationCountries, countries, totalPopulation, usdCountries) {
    const output = document.getElementById('output');
    output.innerHTML = `
        <h2>Asian Countries:</h2>
        ${JSON.stringify(asianCountries, null, 2)}

        <h2>Countries with population less than 2 lakhs:</h2>
        ${JSON.stringify(smallPopulationCountries, null, 2)}

        <h2>Country details (name, capital, flag):</h2>
        ${countries.map(country => `Name: ${country.name.common}, Capital: ${country.capital}, Flag: ${country.flags[0]}`).join('<br>')}

        <h2>Total Population:</h2>
        ${totalPopulation}

        <h2>Countries using USD as currency:</h2>
        ${JSON.stringify(usdCountries, null, 2)}
    `;
}

// Calling the function to fetch data and perform operations
fetchCountriesData();
