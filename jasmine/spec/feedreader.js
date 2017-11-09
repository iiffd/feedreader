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
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check each item in allFeeds has defined url. */
         it('urls in feed are defined', function() {
           for (const index in allFeeds) {
             expect(allFeeds[index].url).toBeDefined();
           }
         });

        /* Check each item in allFeeds has defined name. */
         it('names in feed are defined', function() {
           for (const index in allFeeds) {
             expect(allFeeds[index].name).toBeDefined();
           }
         });
    });


    /* Menu Test suite. */
    describe('The menu', function() {
        /* Check menu starts out hidden. */
         it('menu is hidden', function() {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Check menu shows and hides on menu icon click. */
          it('menu shows and hides on click', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });

    /* Initial Entries test suite. */
    describe('Initial Entries', function() {
        /* Check that feed container has entry elements after async call. */
         beforeEach(function(done) {
           loadFeed(0 ,function() {
             done();
           });
         });

         it('there is entry after loadFeed is called', function(done) {
           expect($('.feed').find('.entry')).toBeDefined();
           done();
         });
       });

    /* New Feed Selection test suite. */
    describe('New Feed Selection', function() {
        /* Check that feed content changes when new feed is selected. */
         let oldFeed,
             newFeed;
         beforeEach(function(done) {
           loadFeed(0, function() {
             oldFeed = $('.feed').find('h2').text();
             done();
           });
         });
         beforeEach(function(done) {
           loadFeed(1, function() {
             newFeed = $('.feed').find('h2').text();
             done();
           });
         });

         it('new feed changes content', function(done) {
           expect(oldFeed === newFeed).toBe(false);
           done();
         });
       });
}());
