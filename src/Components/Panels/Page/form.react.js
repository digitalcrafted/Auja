/**
 * A form, attributes of the form are passed directly
 *
 * @jsx React.DOM
 */

//Listing of all supported page items
var FormItems = {
    'header': 'build/Components/Panels/Page/header.react',
    'text': 'build/Components/Panels/Page/Form/text.react',
    'password': 'build/Components/Panels/Page/Form/password.react',
    'textarea': 'build/Components/Panels/Page/Form/textarea.react',
    'trumbowyg': 'build/Components/Panels/Page/Form/trumbowyg.react',
    'tinymce': 'build/Components/Panels/Page/Form/tinymce.react',
    'number': 'build/Components/Panels/Page/Form/number.react',
    'file_select': 'build/Components/Panels/Page/Form/file_select.react',
    'integer': 'build/Components/Panels/Page/Form/integer.react',
    'url': 'build/Components/Panels/Page/Form/url.react',
    'tel': 'build/Components/Panels/Page/Form/tel.react',
    'color': 'build/Components/Panels/Page/Form/color.react',
    'time': 'build/Components/Panels/Page/Form/time.react',
    'checkbox': 'build/Components/Panels/Page/Form/checkbox.react',
    'email': 'build/Components/Panels/Page/Form/email.react',
    'selectMultiple': 'build/Components/Panels/Page/Form/select_multiple.react',
    'select': 'build/Components/Panels/Page/Form/select.react',
    'selectMultipleCheckbox': 'build/Components/Panels/Page/Form/select_multiple_checkbox.react',
    'date': 'build/Components/Panels/Page/Form/date.react',
    'datetime': 'build/Components/Panels/Page/Form/datetime.react',
    'range': 'build/Components/Panels/Page/Form/range.react',
    'submit': 'build/Components/Panels/Page/Form/submit.react',
    'hidden': 'build/Components/Panels/Page/Form/hidden.react'
};

define([
    'react',
    'build/Components/Panels/Page/header.react',
    'build/Components/Panels/Page/Form/text.react',
    'build/Components/Panels/Page/Form/password.react',
    'build/Components/Panels/Page/Form/textarea.react',
    'build/Components/Panels/Page/Form/trumbowyg.react',
    'build/Components/Panels/Page/Form/tinymce.react',
    'build/Components/Panels/Page/Form/number.react',
    'build/Components/Panels/Page/Form/file_select.react',
    'build/Components/Panels/Page/Form/integer.react',
    'build/Components/Panels/Page/Form/url.react',
    'build/Components/Panels/Page/Form/tel.react',
    'build/Components/Panels/Page/Form/color.react',
    'build/Components/Panels/Page/Form/time.react',
    'build/Components/Panels/Page/Form/checkbox.react',
    'build/Components/Panels/Page/Form/email.react',
    'build/Components/Panels/Page/Form/select_multiple.react',
    'build/Components/Panels/Page/Form/select.react',
    'build/Components/Panels/Page/Form/select_multiple_checkbox.react',
    'build/Components/Panels/Page/Form/date.react',
    'build/Components/Panels/Page/Form/datetime.react',
    'build/Components/Panels/Page/Form/range.react',
    'build/Components/Panels/Page/Form/submit.react',
    'build/Components/Panels/Page/Form/hidden.react'
], function (React) {
    return React.createClass({

        /**
         * Focus first element after form load
         */
        componentDidMount: function() {
            $(this.refs.form.getDOMNode()).find('input:visible:first').focus();
        },

        /**
         * Handles form submission
         */
        handleSubmit: function (event) {
            event.preventDefault();
            flux.actions.submit(
                this.props.item.getAction(),
                event.target.getAttribute('method'),
                $(event.target).serializeArray(),
                this.props.panel
            );
        },

        /**
         * Generate an ID for an item
         * @param item
         */
        getFormItemId: function (item) {
            if (!this.formItemIds) {
                this.formItemIds = [];
            }

            var i = 1;
            var available = false;
            while (!available) {
                var id = 'input.{panel}.{type}.{index}'.assign({
                    panel: this.props.panel.id,
                    type: item.getType(),
                    index: i
                });

                if (!this.formItemIds[name]) {
                    available = true;
                }
            }

            return id;
        },

        render: function () {

            var items = this.props.item.getItems().map(function (item) {

                if (!FormItems[item.getType()]) {
                    console.error("Unsupported form item type requested: " + item.getType());
                    return;
                }

                //Fetch the item from the corresponding file
                var Item = require(FormItems[item.getType()]);

                //Extract the validation message from the item
                item.validationMessage = null;
                if (item.getName() && this.props.message && this.props.message.validation && this.props.message.validation[item.getName()]) {
                    item.validationMessage = this.props.message.validation[item.getName()];
                }

                var className = 'row form-item form-item-{type}'.assign({type: item.getType()});
                return (
                    <div className={className}>
                        <Item itemId={this.getFormItemId(item)} item={item} />
                    </div>
                );
            }.bind(this));

            return (
                <form ref="form" onSubmit={this.handleSubmit} action={this.props.item.getAction()} method={this.props.item.getMethod()}>{items}</form>
            );
        }
    });

});