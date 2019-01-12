/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* Test suite for RSS feeds
     */
    describe('RSS Feeds', function() {
        /* Test ensures that the allFeeds variable
         * has been defined and that it is not empty
         */
        it('itself are defined', function() {
            expect(allFeeds).toBeDefined(); //check feeds defined
            expect(allFeeds.length).not.toBe(0); //check feeds not empty
        });

        // Test ensures that url property is defined and not empty

        it('have url defined and is not empty', function() {
            for (let feed of allFeeds) { //loop to gather all feeds
                expect(feed.url).toBeDefined(); //check url defined
                expect(feed.url).toBeTruthy(); //check url not empty
            }
        });

        // Test ensure that name property is defined and not empty
        it('have name defined and is not empty', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined(); //check name defined
                expect(feed.name.length).not.toBe(0); //check name not empty
            }

        });
    });

    //Test suite for web application menu

    describe('The Menu', function() {
        // Test ensures the menu element is hidden by default
        it('is hidden by default', function() {
            //menu-hidden class exists by default
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
        /* Test ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when clicked', function() {
            //menu-hidden class appears and disappears each time icon is clicked
            var menu = document.querySelector('.menu-icon-link');
            menu.click(); //First click simulated to display menu
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            menu.click(); //Second click simulated to hide menu
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });
    });

    // Test suite for initial feed content
    describe('Initial Entries', function() {
        /* Test ensures when the loadFeed function is called and
         * completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, done); //Loads feed
        });

        it('have at least an entry', function() {
            var feed = document.querySelector('.feed');
            var entries = feed.getElementsByClassName('entry');
            expect(entries.length >= 1).toBe(true); //Check feed has content
        });
    });

    //Test suite for new feed content
    describe('New Feed Selection', function() {
        /* Test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            //Check that there are more than 1 feed for comparison
            expect(allFeeds.length > 1).toBe(true);
            loadFeed(0, function() { //Loads first feed for initial content
                firstFeed = document.querySelector(".feed").innerText;
                loadFeed(1, function() { //Loads second feed
                    secondFeed = document.querySelector(".feed").innerText;
                    done();
                });
            });
        });

        it('has content which changes', function(done) {
            //Comparison to see if the contents of both feeds are different
            expect(firstFeed === secondFeed).toBe(false);
            done();
        });

    });

}());
