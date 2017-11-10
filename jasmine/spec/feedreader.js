/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(() => {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Check each item in allFeeds has defined url. */
         it('urls in feed are defined', () => {
           allFeeds.forEach((feed) => {
             expect(feed.url).toBeDefined();
             expect(feed.url).not.toBe(0);
           });
         });

        /* Check each item in allFeeds has defined name. */
         it('names in feed are defined', () => {
           allFeeds.forEach((feed) => {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toBe(0);
           });
         });
    });


    /* Menu Test suite. */
    describe('The menu', () => {
        /* Check menu starts out hidden. */
         it('menu is hidden', () => {
           expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Check menu shows and hides on menu icon click. */
          it('menu shows and hides on click', () => {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });
        });

    /* Initial Entries test suite. */
    describe('Initial Entries', () => {
        /* Check that feed container has entry elements after async call. */
         beforeEach((done) => {
           loadFeed(0 ,() => {
             done();
           });
         });

         it('there is entry after loadFeed is called', (done) => {
           expect($('.feed').find('h2').text()).not.toBe(0);
           expect($('.feed').find('h2').text()).toBeDefined();
           done();
         });
       });

    /* New Feed Selection test suite. */
    describe('New Feed Selection', () => {
        /* Check that feed content changes when new feed is selected. */
         let oldFeed,
             newFeed;
         beforeEach((done) => {
           loadFeed(0, () => {
             oldFeed = $('.feed').find('h2').text();
           });
           loadFeed(1, () => {
             newFeed = $('.feed').find('h2').text();
             done();
           });
         });


         it('new feed changes content', (done) => {
           expect(oldFeed).not.toBe(newFeed);
           done();
         });
       });
}());
