define([
    "dojo/_base/declare",
    "dojo/_base/lang",

    "dijit/registry",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dijit/_Container",
    "dijit/layout/ContentPane",
    "dojox/layout/TableContainer",
    "epi-cms/widget/ContentSelector",
    "epi-cms/widget/_HasChildDialogMixin",
    "epi/shell/widget/_ValueRequiredMixin",
    "epi/dependency",
    "dijit/form/Select"

], function (
    declare,
    lang,

    registry,
    _Widget,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    _Container,
    ContentPane,
    TableContainer,
    ContentSelector,
    _HasChildDialogMixin,
    _ValueRequiredMixin,
    dependency,
    Select
) {
        return declare("adaptiveimages.AdaptiveImagesPlugin.AdaptiveImagesEditor",
            [_Widget, _TemplatedMixin, _WidgetsInTemplateMixin, _Container, _HasChildDialogMixin, _ValueRequiredMixin], {
                value: null,
                that: null,
                intermediateChanges: false,
                widgetsInTemplate: true,
                templateString: '<div data-dojo-attach-point="stateNode, tooltipNode" class="dijit dijitReset dijitInline"><div class="dijit dijitReset"><div class="nho-content-picker dijit dijitReset dijitInline" data-dojo-attach-point="contentPickerContainer"></div></div></div>',
                postCreate: function () {

                    this.inherited(arguments);

                    this.layoutGlobal = new TableContainer({
                        showLabels: true,
                        orientation: "horiz"
                    });
                    console.log("this.layoutGlobal... ");
                    var contentRepositoryDescriptors = dependency.resolve("epi.cms.contentRepositoryDescriptors");

                    this.autoSelectionOption = new Select({
                        title: "Auto Selection",
                        style: "margin: 15px 10px;",
                        name: "select",
                        options: [
                            { label: "Auto", value: "0", selected: true },
                            { label: "Custom", value: "1" }
                        ]
                    });
                    console.log("this.autoSelectionOption... ");

                    // Create an instance of the EPiServer ContentSelector. Pass in the settings defined in the server-side part.
                    this.contentPickerUltraWide = new ContentSelector({
                        title: "Ultra Wide",
                        required: true,
                        missingMessage: "You must select an image",
                        showSearchBox: true,
                        dndSourcePropertyName: "contentLink",
                        searchArea: contentRepositoryDescriptors["media"].searchArea,
                        roots: contentRepositoryDescriptors["media"].roots,
                        allowedTypes: ["episerver.core.icontentmedia"],
                        allowedDndTypes: ["episerver.core.icontentmedia"],
                        _onDialogHide: lang.hitch(this, "_updateItem"),
                        onDrop: lang.hitch(this, "_updateItem")

                    });

                    this.contentPickerLarge = new ContentSelector({
                        title: "Large",
                        required: true,
                        missingMessage: "You must select an image",
                        showSearchBox: true,
                        dndSourcePropertyName: "contentLink",
                        searchArea: contentRepositoryDescriptors["media"].searchArea,
                        roots: contentRepositoryDescriptors["media"].roots,
                        allowedTypes: ["episerver.core.icontentmedia"],
                        allowedDndTypes: ["episerver.core.icontentmedia"],
                        _onDialogHide: lang.hitch(this, "_updateItem"),
                        onDrop: lang.hitch(this, "_updateItem")
                    });

                    this.contentPickerMedium = new ContentSelector({
                        title: "Medium",
                        required: true,
                        missingMessage: "You must select an image",
                        showSearchBox: true,
                        isShowingChildDialog: true,
                        dndSourcePropertyName: "contentLink",
                        searchArea: contentRepositoryDescriptors["media"].searchArea,
                        roots: contentRepositoryDescriptors["media"].roots,
                        allowedTypes: ["episerver.core.icontentmedia"],
                        allowedDndTypes: ["episerver.core.icontentmedia"],
                        _onDialogHide: lang.hitch(this, "_updateItem"),
                        onDrop: lang.hitch(this, "_updateItem")
                    });

                    this.contentPickerSmall = new ContentSelector({
                        title: "Small",
                        required: true,
                        missingMessage: "You must select an image",
                        showSearchBox: true,
                        isShowingChildDialog: true,
                        dndSourcePropertyName: "contentLink",
                        searchArea: contentRepositoryDescriptors["media"].searchArea,
                        roots: contentRepositoryDescriptors["media"].roots,
                        allowedTypes: ["episerver.core.icontentmedia"],
                        allowedDndTypes: ["episerver.core.icontentmedia"],
                        _onDialogHide: lang.hitch(this, "_updateItem"),
                        onDrop: lang.hitch(this, "_updateItem")
                    });
                    console.log("Content Pickers... ");
                    if (this.value !== null) {
                        this.autoSelectionOption.set("value", this.value.isCustom ? "1" : "0");
                        this.contentPickerUltraWide.set("value", this.value.ultraWide || null);
                        this.contentPickerLarge.set("value", this.value.large || null);
                        this.contentPickerMedium.set("value", this.value.medium || null);
                        this.contentPickerSmall.set("value", this.value.small || null);
                    }
                    window.console && console.log("Set Values for Controls.....");
                    this.connect(this.autoSelectionOption, "onChange", this._setVis);

                    //global variable for the current widget (for use during the onhide function)
                    that = this;

                    this.layoutGlobal.addChild(this.autoSelectionOption);
                    this.layoutGlobal.addChild(this.contentPickerUltraWide);
                    this.layoutGlobal.addChild(this.contentPickerLarge);
                    this.layoutGlobal.addChild(this.contentPickerMedium);
                    this.layoutGlobal.addChild(this.contentPickerSmall);

                    window.console && console.log("Placing Controls.....");
                    this.layoutGlobal.placeAt(this.contentPickerContainer);

                    window.console && console.log("Done Placing Controls.....");
                },
                startup: function () {
                    //inherit base functionality from dojo startup
                    this.inherited(arguments);

                    //set custom display
                    this._setVis();
                },
                _setVis: function () {
                    if (that.autoSelectionOption.value === "0") {
                        $(that.contentPickerMedium.domNode.parentNode.parentNode).hide();
                        $(that.contentPickerSmall.domNode.parentNode.parentNode).hide();
                        that.contentPickerMedium.reset();
                        that.contentPickerSmall.reset();
                    } else {
                        $(that.contentPickerMedium.inputContainer.parentNode.parentNode).show();
                        $(that.contentPickerSmall.inputContainer.parentNode.parentNode).show();
                    }
                    that._updateItem();
                },
                _setValueAttr: function (value) {

                    if (value === this.value) {
                        return;
                    }

                    this._set("value", value);
                    this.onChange(value);

                    window.console && console.log("Set Value attribute");
                    window.console && console.log(value);
                },
                _updateItem: function () {

                    var item = {
                        IsCustom: that.autoSelectionOption.value === "1",
                        UltraWide: that.contentPickerUltraWide.isValid() ? that.contentPickerUltraWide.value : null,
                        Large: that.contentPickerLarge.isValid() ? that.contentPickerLarge.value : null,
                        Medium: that.contentPickerMedium.value || null,
                        Small: that.contentPickerSmall.value || null
                    };

                    that._updateValue(item);
                },
                _updateValue: function (value) {
                    var hasChanged = true;

                    if (this.value !== null) {
                        window.console && console.log("Update Value this.value is not NULL");
                        hasChanged = this.value !== value;
                    }

                    if (hasChanged) {
                        window.console && console.log("New value for this.value.... going to _onChange(value)");
                        this._onChange(value);
                    }
                },
                //Event that tells EPiServer when the widget's value has changed.
                onChange: function (value) {
                    window.console && console.log("--->         onChange(value)         <------");
                },
                _onChange: function (value) {
                    console.log("Notifying EPiServer with onChange: " + JSON.stringify(value));

                    this._set('value', value);
                    this.onChange(value);

                    console.log("Done notitying EPiServer");
                },
                isValid: function (value) {
                    var isValid = true;

                    if (this.autoSelectionOption.value === "0") {
                        this.contentPickerUltraWide.validate();
                        this.contentPickerLarge.validate();

                        isValid = this.contentPickerUltraWide.isValid()
                            && this.contentPickerLarge.isValid();
                    } else {

                        this.contentPickerUltraWide.validate();
                        this.contentPickerLarge.validate();
                        this.contentPickerLarge.validate();
                        this.contentPickerMedium.validate();
                        this.contentPickerSmall.validate();

                        isValid = this.contentPickerUltraWide.isValid()
                            && this.contentPickerLarge.isValid()
                            && this.contentPickerMedium.isValid()
                            && this.contentPickerSmall.isValid();
                    }
                    return isValid;
                }
            });
    });