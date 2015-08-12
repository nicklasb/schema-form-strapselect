/*global angular */
"use strict";

/**
 * The main app module
 * @name testApp
 * @type {angular.Module}
 */

var testApp = angular.module("testApp", ["schemaForm", "mgcrea.ngStrap", "mgcrea.ngStrap.modal",
    "pascalprecht.translate", "ui.select", "mgcrea.ngStrap.select"

]);

testApp.controller("appController", ["$scope", "$http", function ($scope, $http) {

    $scope.callBackSD = function (options, search) {
        if (search) {
            console.log("Here the select lis could be narrowed using the search value: " + search.toString());
            return [
                {value: "value1", name: "text1"},
                {value: "value2", name: "text2"},
                {value: "value3", name: "Select dynamic!"}
            ].filter(function (item) {
                    return (item.name.search(search) > -1)
                });
        }
        else {
            return [
                {value: "value1", name: "text1"},
                {value: "value2", name: "text2"},
                {value: "value3", name: "Select dynamic!"}
            ];

        }
        // Note: Options is a reference to the original instance, if you change a value,
        // that change will persist when you use this form instance again.
    };
    $scope.callBackUI = function (options) {
        return [
            {"value": "value1", "name": "text1", "category": "value1"},
            {"value": "value2", "name": "text2", "category": "value1"},
            {"value": "value3", "name": "So this is the next item", "category": "value2"},
            {"value": "value4", "name": "The last item", "category": "value1"}
        ];
        // Note: Options is a reference to the original instance, if you change a value,
        // that change will persist when you use this form instance again.
    };
    $scope.callBackMSD = function (options) {
        return [
            {value: "value1", name: "text1"},
            {value: "value2", name: "text2"},
            {value: "value3", name: "Multiple select dynamic!"}
        ];
        // Note: Options is a reference to the original instance, if you change a value,
        // that change will persist when you use this form instance again.
    };

    $scope.callBackMSDAsync = function (options) {
        // Note that we got the url from the options. Not necessary, but then the same callback function can be used
        // by different selects with different parameters.

        // The asynchronous function must always return a httpPromise
        return $http.get(options.urlOrWhateverOptionIWant);
    };

    $scope.stringOptionsCallback = function (options) {
        // Here you can manipulate the form options used in a http_post or http_get
        // For example, you can use variables to build the URL or set the parameters, here we just set the url.
        options.httpPost.url = "test/testdata.json";
        // Note: This is a copy of the form options, edits here will not persist but are only used in this request.
        return options;
    };

    $scope.schema = {
        type: "object",
        title: "Select",
        properties: {
            select: {
                title: "Single select strap-select",
                type: "string",
                enum: ["value1", "value2", "value3"],
                description: "Only single item is allowed. Based on schema enum and form default. Change here and observe how the select list below is filtered."
            },
            multiselect: {
                title: "Multi select strap-select",
                type: "array",
                items: {type: "string"},
                maxItems: 2,
                description: "Multiple items are allowed, select three for maxItems validation error. Each item belongs to a \"category\", so the list is filtered depending on what you have selected in the \"Single select strap-select\" above."
            },
            uiselect: {
                title: "Single select for UI-select",
                type: "string",
                description: "This one is using UI-select, single selection. Fetches lookup values(titleMap) from a callback."
            },
            uiselectmultiple: {
                title: "Multi select for UI-select",
                type: "array",
                items: {type: "integer"},
                description: "This one is using UI-select, allows multiple selection. From a callback."
            },
            selectDynamic: {
                title: "Single Select Dynamic",
                type: "string",
                description: "This titleMap is loaded from the $scope.callBackSD function. (and laid out using css-options)"
            },
            multiselectDynamic: {
                title: "Multi Select Dynamic",
                type: "array",
                items: {type: "string"},
                description: "This titleMap is loaded from the $scope.callBackMSD function. (referenced by name)"
            },
            multiselectDynamicHttpPost: {
                title: "Multi Select Dynamic HTTP Post",
                type: "array",
                items: {type: "string"},
                description: "This titleMap is asynchronously loaded using a HTTP post. " +
                "(specifies parameter in form, options.url in a named callback)"
            },
            multiselectDynamicHttpGet: {
                title: "Multi Select Dynamic HTTP Get",
                type: "array",
                items: {type: "string"},
                description: "This titleMap is asynchronously loaded using a HTTP get. " +
                "(Set the URL at options.url)"
            },
            multiselectDynamicHttpGetMapped: {
                title: "Multi Select Dynamic HTTP Get Mapped data",
                type: "array",
                items: {type: "string"},
                description: "This titleMap is as above, but remapped from a nodeId/nodeName array of objects. " +
                "(See app.js: \"map\" : {valueProperty: \"nodeId\", textProperty: \"nodeName\"})"
            },
            multiselectDynamicAsync: {
                title: "Multi Select Dynamic Async",
                type: "array",
                items: {type: "string"},
                description: "This titleMap is asynchrously loaded using options.async.call and implements the onChange event. "
            },
            multiselect_overflow: {
                title: "Strap select with overflow",
                type: "array",
                items: {type: "string"},
                description: "If you select more than two items here, it will only show the first two and "
            },
            "priorities": {
                "type": "object",
                "properties": {
                    "priority": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "value": {
                                    "type": "string",
                                    "enum": ["DOG", "CAT", "FISH"]
                                }
                            }
                        }
                    }
                }
            }
        },
        required: ["select", "multiselect"]
    };

    $scope.form = [

        {
            "key": "select"
        },
        {
            "key": "multiselect",
            "type": "strapselect",
            "placeholder": "My items feel unselected. Or you selected text3 in the selector above me.",
            "options": {
                "multiple": "true",
                "filterTriggers": ["model.select"],
                "filter": "item.category.indexOf(model.select) > -1"
            },
            "validationMessage": "Hey, you can only select three items or you'll see this!",
            "titleMap": [
                {"value": "value1", "name": "text1 (belongs to the value1-category)", "category": "value1"},
                {"value": "value2", "name": "text2 (belongs to the value1-category)", "category": "value1"},
                {
                    "value": "value3",
                    "name": "long very very long label3 (belongs to the value2-category)",
                    "category": "value2"
                },
                {
                    "value": "value4",
                    "name": "Select three and get a validation error! (belongs to the value1-category)",
                    "category": "value1"
                }
            ]
        },
        {
            "key": "uiselect",
            "type": "uiselect",
            "placeholder": "not set yet..",
            "options": {
                "callback": "callBackSD"
            }
        },

        {
            "key": "uiselectmultiple",
            "type": "uiselectmultiple",
            "placeholder": "not set yet..",
            "options": {
                "callback": "callBackUI"
            }
        },
        {
            "key": "selectDynamic",
            "type": "strapselect",
            "htmlClass": "col-lg-3 col-md-3",
            "labelHtmlClass": "bigger",
            "fieldHtmlClass": "tilted",
            "options": {
                "callback": $scope.callBackSD
            }
        },
        {
            "key": "multiselectDynamic",
            "type": "strapselect",
            placeholder: "not set yet(this text is defined using the placeholder option)",
            "options": {
                "multiple": "true",
                "callback": "callBackMSD"
            }
        },
        {
            "key": "multiselectDynamicHttpPost",
            "type": "strapselect",
            "title": "Multi Select Dynamic HTTP Post (title is from form.options, overriding the schema.title)",
            "options": {
                "multiple": "true",
                "httpPost": {
                    "optionsCallback": "stringOptionsCallback",
                    "parameter": {"myparam": "Hello"}
                }
            }
        },
        {
            "key": "multiselectDynamicHttpGet",
            "type": "strapselect",
            "placeholder": "None selected here neither.",
            "options": {
                "multiple": "true",
                "httpGet": {
                    "url": "test/testdata.json"
                }
            }
        },
        {
            "key": "multiselectDynamicHttpGetMapped",
            "type": "strapselect",
            "placeholder": "And even less here...",
            "options": {
                "multiple": "true",
                "httpGet": {
                    "url": "test/testdata_mapped.json"
                },
                "map": {valueProperty: "nodeId", nameProperty: "nodeName"}
            }
        },
        {
            "key": "multiselectDynamicAsync",
            "type": "strapselect",
            "onChange": function (modelValue, form) {
                $scope.form.forEach(function (item) {
                    if (item.key == "multiselectDynamicHttpGet") {
                        item.options.scope.populateTitleMap(item);
                    }
                });
                alert("onChange happened!\nYou changed this value into " + modelValue + " !\nThen code in this event cause the multiselectDynamicHttpGet to reload. \nSee the ASF onChange event for info.");


            },
            "options": {
                "multiple": "true",
                "asyncCallback": $scope.callBackMSDAsync,
                "urlOrWhateverOptionIWant": "test/testdata.json"
            }
        },
        {
            "key": "multiselect_overflow",
            "type": "strapselect",
            "placeholder": "Please select some items.",
            "options": {
                "multiple": "true",
                "inlineMaxLength": "2",
                "inlineMaxLengthHtml": "Too many items to show...."
            },
            "titleMap": [
                {"value": "value1", "name": "text1"},
                {"value": "value2", "name": "text2"},
                {"value": "value3", "name": "text3"},
                {"value": "value4", "name": "text4"}
            ]
        },
        {
            "key": "priorities.priority",
            "title": "Array inside an object, defaults ASF select only",
            "description": "This is an example of how to use this in a complex structure. Note that the title and description is in the form, ASF only looks in the form for that.",
            "type": "array",
            "items": [
                {
                    "key": "priorities.priority[].value",
                    "type": "strapselect"
                }
            ]
        },
        {
            "type": "help",
            "helpvalue" : 
                "<h4>Support for fieldAddonLeft and fieldAddonRight</h4>" +
                "<p>Standard angular-schema-form selects don't support the fieldAddonLeft and fieldAddonRight options " +
                "because Bootstrap doesn't support the input-group-addon class with selects. With this library, selects " +
                "are composed from a button, which enables the use of these options.</p>"
        },
        {
            "key": "select",
            "title": "Single select strap-select, demonstrating support for fieldAddonLeft and fieldAddonRight.",
            "description": null,
            "fieldAddonLeft": "Left",
            "fieldAddonRight": "Right"           
        },
        {
            "key": "multiselect",
            "title": "Multi select strap-select, demonstrating support for fieldAddonLeft and fieldAddonRight.",
            "type": "strapselect",
            "placeholder": "My items feel unselected. Or you selected text3 in the selector above me.",
            "description": null,
            "options": {
                "multiple": "true",
            },
            "titleMap": [
                {"value": "value1", "name": "text1"},
                {"value": "value2", "name": "text2"}
            ],
            "fieldAddonLeft": "Left",
            "fieldAddonRight": "Right"    
        },
        {
            type: "submit",
            style: "btn-info",
            title: "OK"
        }

    ];
    $scope.model = {};
    $scope.model.select = "value1";
    $scope.model.multiselect = ["value2", "value1"];
    $scope.model.uiselect = "value1";
    $scope.model.uiselectmultiple = ["value1", "value2"];


    $scope.model.priorities = {
        "priority": [
            {
                "value": "DOG"
            },
            {
                "value": "DOG"
            },
            {
                "value": "FISH"
            }
        ]
    };

    $scope.submitted = function (form) {
        $scope.$broadcast("schemaFormValidate");
        console.log($scope.model);
    };
}])
;

