const statsTemplate = '<hr/><div class="stats"></div>';
let authors = new Set();

// find all of the authors on the page
$('.author').each(function () {
    if ($(this).children().length === 0)
        authors.add($(this).text());
    else
        authors.add($(this).find('strong').text());
});

// get and set the stats for all of them
$.getJSON('http://10.0.1.2:5000/api/bulk/' + JSON.stringify(Array.from(authors)))
    .then(res => {
        $('.author').each(function (i, obj) {
            let name;
            if ($(this).children().length === 0)
                name = $(this).text();
            else
                name = $(this).find('strong').text();

            $(this).append(statsTemplate);
            $(this).find('.stats').text(res[name] + ' posts');
        });
    });