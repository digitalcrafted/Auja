/**
 * Page panel type
 * 
 * @todo implement sorting
 */
define(['build/Objects/panel'], function(Panel) {

    var Page = function() {

        /**
         * Content of a page
         * @type {Array}
         */
        this.content = [];

        /**
         * Set panel type
         * @type {string}
         */
        this.type = 'page';

        //Call the parent constructor
        Panel.call(this, arguments);

    };

    // Inherit Panel
    Page.prototype = Panel;

    // Fix constructor
    Page.prototype.constructor = Page;

    /**
     * Set the content of a page
     */
    Page.prototype.setContent = function(content) {
        this.content = content;
    };

    /**
     * Getter for the content
     * @returns {Array}
     */
    Page.prototype.getContent = function() {
        return this.content;
    };

    return Page;
});