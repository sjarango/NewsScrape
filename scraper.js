// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

const cheerio = require('cheerio');
const axios = require('axios');


async function scrape() {
  // Make a request via axios to grab the HTML body from the site of your choice
  //const response = await axios.get('https://www.myfavoritesite.com');
  const response = await axios.get('https://www.techcrunch.com/');

  // Load the response data into cheerio and then select the data of
  // interest from the html using cheerio selectors, putting the results in a results array.

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    const $ = cheerio.load(response.data);

    // An empty array to save the data that we'll scrape
    const results = [];

    // With cheerio, find each p-tag with the "title" class
    // (i: iterator. element: the current element)
    $('h2.post-block__title').each(function (i, element) {
      // Save the text of the element in a "title" variable
      const title = $(element).text();

      // In the currently selected element, look at its child elements (i.e., its a-tags),
      // then save the values for any "href" attributes that the child elements may have
      const link = $(element).children().attr('href');

      const summary = $(element).find('p').text();

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title.replace(/^\n\s+/, '').replace(/\t\s+$/, ''),
        link: link,
        summary: summary,
      });
    });


    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);
  }

  scrape();
