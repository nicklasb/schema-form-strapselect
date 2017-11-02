[![bower version](https://img.shields.io/bower/v/angular-schema-form-dynamic-select.svg?style=flat-square)](#bower)
[![npm version](https://img.shields.io/npm/v/angular-schema-form-dynamic-select.svg?style=flat-square)](https://www.npmjs.org/package/angular-schema-form-dynamic-select)
[![Join the chat at https://gitter.im/OptimalBPM/angular-schema-form-dynamic-select](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OptimalBPM/angular-schema-form-dynamic-select?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Angular Schema Form Dynamic Select (ASFDS) add-on
=================================================

This add-on integrates the [angular-strap-select](https://github.com/mgcrea/angular-strap/tree/master/src/select) and the [angular-ui-select](https://github.com/angular-ui/ui-select) components 
 to provide fully featured drop downs to [angular-schema-form](https://github.com/Textalk/angular-schema-form). 

It is drop-in compliant with angular-schema-forms existing selects, which makes using it a breeze, no adaptations are needed.

All settings are kept in the form, separating validation and UI-configuration.

*Note about UI-select: 
The ui-select support is quite new and while many things work, it is still somewhat partial, so WRT the features below, they apply to angular-strap-select. For that reason, ui-select has a [special section in the documentation](https://github.com/OptimalBPM/angular-schema-form-dynamic-select#ui-select).*

# Features:

* Static and dynamic lists
* Single and multiple select
* Convenient HTTP GET/POST and property mapping functionality
* Filters
* Sync and Async callbacks
* All callbacks referenced either by name (string) or reference
* [Angular schema form options](https://github.com/Textalk/angular-schema-form/blob/development/docs/index.md#standard-options)
  * Supported:
    * key, type, title, description, placeholder
    * enum
    * notitle, onChange, condition
    * htmlClass, labelHtmlClass and fieldHtmlClass
    * validationMessage
  * Not supported(will be added):  
    *  readonly, copyValueTo, 
  * Not applicable(will not be added due to the nature of drop downs, [disagree?](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/issues)):
    * feedback
    
   

# Example

There is a live example at [http://demo.optimalbpm.se/angular-schema-form-dynamic-select/](http://demo.optimalbpm.se/angular-schema-form-dynamic-select/).

The example code is in the repository, it's made up of the index.html, app.js, test/testdata.json and test/testdata_mapped.json files.

To run it locally, simply clone the repository:
    
    git clone https://github.com/OptimalBPM/angular-schema-form-dynamic-select.git
    cd angular-schema-form-dynamic-select
    bower update

..and open index.html in a browser or serve using your favorite IDE.

However, to make the *entire* example work properly, as it contains UI-select components, please install the [ui-select dependencies](https://github.com/OptimalBPM/angular-schema-form-dynamic-select#ui-select) as well.

(you will need to have [bower installed](http://bower.io/#install-bower), of course)

# Help

What are my options if I feel I need help?

### I don't understand the documentation
The prerequisite for understanding the ASFDS documentation [below](https://github.com/OptimalBPM/angular-schema-form-dynamic-select#installation-and-usage) is that you have a basic understanding of how to use [Angular Schema Form](https://github.com/Textalk/angular-schema-form#basic-usage).<br />
So if you understand that, and still cannot understand the documentation of ASFDS, it is probably not your fault. [Please create an issue](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/issues) in those cases.<br />

### I have a question
If you have a question and cannot find an answer for it in the documentation below, [please create an issue](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/issues).<br />
Questions and their answers have great value for the community.

### I have found a bug 
[Please create an issue](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/issues).
Be sure to provide ample information, remember that any help won't be better than your explanation. 

Unless something is obviously wrong, you are likely to be asked to provide a [plunkr](http://plnkr.co/)-example, displaying the erroneous behaviour.

<i>While this might feel troublesome, a tip is to always make a plunkr that have the same external requirements as your project.<br />
<b>It is great for troubleshooting</b> those annoying problems where you don't know if the problem is at your end or the components'.<br />
And you can then easily fork and provide as an example.<br />
You will answers and resolutions way quicker, also, many other open source projects require it.</i>

### I have a feature request
[Good stuff! Please create an issue!](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/issues)<br />
(features are more likely to be added the more users they seem to benefit)

### I want to discuss ASFDS or reach out to the developers, or other ASFDS users
[The gitter page](https://gitter.im/OptimalBPM/angular-schema-form-dynamic-select) is good for when you want to talk, but perhaps doesn't feel that the discussion has to be indexed for posterity.


# Glossary

* List items: the items that make up the selection list, for example the items in a drop down.
* ASFDS: Angular-Schema-Form-Dynamic-Select

# Installation and usage

ASFDS is an add-on to the angular-schema-form. To use it (in production), follow these steps:

### Dependencies
Easiest way is to install is with bower, this will also include dependencies:

```bash
$ bower install angular-schema-form-dynamic-select
```

If you want to use the develop branch:

```bash
$ bower install angular-schema-form-dynamic-select#develop
```

\#develop is not recommended for production, but perhaps you want to use stuff from the next version in development.

You can also use npm for installation:

```bash
$ npm i angular-schema-form-dynamic-select
```

### HTML
Usage is straightforward, simply include and reference:
```html
<link href="bower_components/bootstrap/dist/css/bootstrap.css" media="all" rel="stylesheet" />

<script type="text/javascript" src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src='bower_components/angular-strap/dist/angular-strap.min.js'></script>
<script src='bower_components/angular-strap/dist/angular-strap.tpl.min.js'></script>
<script src="bower_components/tv4/tv4.js"></script>
<script src="bower_components/objectpath/lib/ObjectPath.js"></script>
<script src="bower_components/angular-schema-form/dist/schema-form.min.js"></script>
<script src="bower_components/angular-schema-form/dist/bootstrap-decorator.min.js"></script>
<script src="bower_components/angular-schema-form-dynamic-select/angular-schema-form-dynamic-select.js"></script>

```
<i>Note: Make sure you load angular-schema-form-dynamic-select.js **after** loading angular schema form.</i>

### Configuring your angular module

When you create your module, be sure to make it depend on mgcrea.ngStrap as well:
```js
    angular.module('yourModule', ['schemaForm', 'mgcrea.ngStrap']);
```
<i>Note: Se the [ui-select dependencies](https://github.com/OptimalBPM/angular-schema-form-dynamic-select#ui-select) section for ui-select instructions</i>

# Form

ASFDS is configured using form settings. There are no ASFDS-specific settings in the schema.

This is to keep the schemas clean from UI-specific settings and kept usable anywhere in the solution and/or organization.

## Form types

The add-on contributes the following new form types, `strapselect`, `uiselect`, `uiselectmulti`.

The strapselect implements angular-strap-selects and uiselect* implements angular-ui-select.

Built-in select-controls gets the bootstrap look but retain their functionality.


## Form Definition
All settings reside in the form definition. See the [app.js](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/blob/master/app.js) file for this example in use.
```js
$scope.form = [
```

### Single select from static list
The drop down items are defined by and array of value/name objects residing in the form
```js
 {
   "key": 'select',
   "type": 'strapselect',
   "titleMap": [
      {"value": 'value1', "name": 'text1'},
      {"value": 'value2', "name": 'text2'},
      {"value": 'value3', "name": 'text3'}
    ]
 },
```
### Multiple select from static list
Like the above, but allows multiple items to be selected. 
```js
 {
   "key": 'multiselect',
   "type": 'strapselect',
   "options": { 
    "multiple": "true"
   }
   "titleMap": [
        {"value": 'value1', "name": 'text1'},
        {"value": 'value2', "name": 'text2'},
        {"value": 'value3', "name": 'long very very long label3'}
   ]
 },
```   
### Single select from dynamically loaded list via synchronous callback function
Callback must return an array of value/name objects (see static list above).
The "options" structure is passed to it as a parameter.
```js
 {
   "key": "selectDynamic",
   "type": 'strapselect',
   "options": {
        "callback": $scope.callBackSD
   }
 },
```
For examples of how the different kinds of callbacks are implemented, please look at the [relevant code in app.js](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/blob/master/app.js#L18), 
     
### Multiple select from dynamically loaded list via synchronous callback function
Like strapselectdynamic above, but allowed multiple items to be selected.

```js     
 {
   "key": "multiselectDynamic",
   "type": 'strapmultiselect',
   "options": {
       "multiple": "true"
       "callback": $scope.callBackMSD
   }
 },
```     
### Multiple select from asynchronous callback

The asyncCallback must return a *http-style promise* and the data the promise provides must be a JSON array of value/name objects.


```js     
 {
   "key": "multiselectDynamicAsync",
   "type": 'strapselect',
   "options": {
       "multiple": "true"
       "asyncCallback": "callBackMSDAsync"
       }
   }
 },
```
Note that in this example, the reference to the callback is a string, meaning a callback in the using controller scope.
Also note, again, because this is a common misunderstanding, that asyncCallback should *not* return the array of items, but a http-promise, like the one $http.get()/$http.post() or [jquery's deferred.promise](https://api.jquery.com/deferred.promise/).
Returning the array would be a synchronous operation, see "callback" above.

### Multiple select from dynamically loaded list via http get
Convenience function, makes a get request, no need for callback.
Expects the server to return a JSON array of value/name objects.
```js    
 {
   "key": "multiselectDynamicHttpGet",
   "type": 'strapselect',
   "options": {
       "multiple": "true"
       "httpGet": {
           "url" : "test/testdata.json"
       }
   }
 },
```
### Multiple select from dynamically loaded list via http post with an options callback
Like the get variant above function, but makes a JSON POST request passing the "parameter" as JSON.<br />
This example makes use of the optionsCallback property. 
It is a callback that like the others, gets the options structure
as a parameter, but allows its content to be modified and returned for use in the call. 
Here, the otherwise mandatory httpPost.url is not set in the options but in the callback.

See the [stringOptionsCallback function in app.js](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/blob/master/app.js#L46) for an example. 
The options-instance that is passed to the parameter is a *copy* of the instance in the form, 
so the form instance is not affected by any modifications by the callback.
```js
 {
   "key": "multiselectDynamicHttpPost",
   "type": 'strapselect',
   "options": {
       "multiple": "true"
       "httpPost": {
           "optionsCallback" : "stringOptionsCallback",
           "parameter": { "myparam" : "Hello"}
       }
   }
 },
```

### Property mapping
The angular-schema-form titleMap naming standard is value/name, but that is sometimes difficult to get from a server, 
it might not support it.
Therefore, a "map"-property is provided. <br />
The property in valueProperty says in what property to look for the value, and nameProperty the name.
In this case:
```js
{"nodeId" : 1, "nodeName": "Test", "nodeType": "99"}
```
which cannot be used, is converted into:
```js
{"value" : 1, "name": "Test", "nodeId" : 1, nodeName: "Test", "nodeType": "99"}
```
which is the native format with the old options retained to not destroy auxiliary information.
For example, a field like "nodeType" might be used for filtering(see Filters section, below). 
The options for that mapping look like this:
```js
 {
   "key": "multiselectdynamic_http_get",
   "type": "strapselect",
   "options": {
        "multiple": "true"
        "httpGet": {
            "url": "test/testdata_mapped.json"
        },
        "map" : {"valueProperty": "nodeId", nameProperty: "nodeName"}
   }
 },    
```     
The nameProperty can also be an array, in which case ASFDS looks for the first value. 
For example, in this case, one wants to first show the caption, and if that is not available, the name:

```js
"map" : {"valueProperty": "nodeId", nameProperty: ["nodeCaption", "nodeName"]}
```
     
*For more complicated mappings, and situations where the source data is
in a completely different format, the callback and asyncCallback options can be used instead.*

## Filters

Filters, like [conditions](https://github.com/Textalk/angular-schema-form/blob/development/docs/index.md#standard-options),
 handle visibility, but for each item in the options list.

It works by evaluating the filter expression for each row, if it evaluates to true, the option remains in the list.
One could compare it with an SQL join.
 
The options are:

* filter : An expression, evaluated in the user scope, with the "item" local variable injected. "item" is the current list item, `"model.select==item.category"`
* filterTrigger : An array of expressions triggering the filtering, `"model.select"`

Example:
```js
{
    "key": 'multiselect',
    "type": 'strapselect',
    options: {
        "multiple": "true"           
        "filterTriggers": ["model.select"],
        "filter" : "model.select==item.category"
    },
    "titleMap": [
        {"value": 'value1', "name": 'text1', "category": "value1"},
        {"value": 'value2', "name": 'text2', "category": "value1"},
        {"value": 'value3', "name": 'long very very long label3'}
    ]
},
```
Note on filterTrigger and why not having a watch on the entire expression:

* The expression is actually a one-to-many join, and mixes two scopes in the evaluation. This might not always be handled the same by $eval. 
* Adding watches for the expression would mean having to add one watch for each list item, long lists would mean a huge overhead.
* Also, there might be use cases where triggering should be triggered by other conditions. Or not be triggered for some other reason.

## The ASFDS controller scope

One usable property that is set by ASFDS is the options.scope-attribute.

Its value is the scope of the controller, which provides far-reaching control over ASFDS behavior.

In the [example](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/blob/master/app.js), the multiselectDynamicAsync's 
onChange event is implemented so that another ASFDS controller is told to repopulate its select list items when the value is changed.
This is valuable, for example, when there is too much data or for some other reason, filters are inappropriate.

## Defaults and enum
If a there is a form item that only has type "string" defined, but has an enum value, then a single select will be shown for that value.
```js
{
    "key": 'select'
},
```  
The schema declaration(the enum values will be both value and name for the options): 
```js   
select: {
    title: 'Single Select Static',
    type: 'string',
    enum: ["value1", "value2", "value3"],
    description: 'Only single item is allowed. Based on schema enum and form default.(change here and observe how the select list below is filtered)'
},
```
## inlineMaxLength and inlineMaxLengthHtml angularStrap parameters.
These settings affects only [strapselect](http://mgcrea.github.io/angular-strap/#/selects-usage) and controls the number of items that are shown in the selected list of items.
If that list is full, the number of list items + the test in inlineMaxLengthHtml is shown.
If, for example, inlineMaxLength is set to 2 and the number of selected items is 4, the text shown will be:

`4 items are too many items to show....` 

Example(the same as in the example file):
```js
    "key": 'multiselect_overflow',
    "type": 'strapselect',
    "placeholder": "Please select some items.",
    "options": {
        "multiple": "true",
        "inlineMaxLength": "2",
        "inlineMaxLengthHtml": " items are too many items to show...."
    },
    "titleMap": [
        {"value": 'value1', "name": 'text1'},
        {"value": 'value2', "name": 'text2'},
        {"value": 'value3', "name": 'text3'},
        {"value": 'value4', "name": 'text4'},
    ]

```
## Positioning the angularStrap select.
The placement option can be used to position a [strapselect](http://mgcrea.github.io/angular-strap/#/selects). Possible values for placement are top, bottom, left, right, auto or any combination (e.g. bottom-right).
Further details can be found in the [angularStrap select documentation](http://mgcrea.github.io/angular-strap/#/selects-usage).

Example (the same as in the example file):
```js
    "key": "select_placement",
	"placeholder": "Please select from the right.",
	"options": {
		"placement": "right"
	}

```
### And then a submit button. 
Not needed, of course, but is commonly used.
```js
 {
   type: "submit",
   style: "btn-info",
   title: "OK"
 }
 ```   
And ending the form element array:
```js
];
```  

# Populating the list items

The form.titleMap property in a form holds the list items(also in the dynamic variants).
The name titleMap is the same as the built-in angular-schema-form select. 

## Dynamically fetching list items
These types are dynamic and fetches their data from different back ends.

#### Callbacks in general
Callbacks can be defined either by name(`"loadGroups"`) or absolute reference (`$scope.loadGroups`). 

The name is actually is an expression evaluated in the user scope that must return a function reference.
This means that it *can* be `"getLoadFunctions('Groups')"`, as long as that returns a function reference.

But the main reason for supporting referring to functions both by name and reference is that forms 
are often stored in a database and passed from the server to the client in [pure JSON format](http://stackoverflow.com/questions/2904131/what-is-the-difference-between-json-and-object-literal-notation),
and there, `callback: $scope.loadGroups` is not allowed.

#### Callback results
The results of all callbacks can be remapped using the "map" property described above.
All callbacks(also optionsCallback) has two parameters: 
* the options of the form, 
* if it is a UI-selects, the entered search value (see the UI-select example).

The two kinds of callback mechanisms are:

### callback and asyncCallback

* list items are fetched by a user-specified callback. The user implements the calling mechanism.
* the callback receive the form options as a parameter and returns an array of list items(see the static strapselect)
* asyncCallback implementations returns the data through a HttpPromise. NOT an array if items.

*TIP: in an asyncCallback, you need to intercept and change an async server response before passing it on to the add-on, use the [transformResponse function](https://docs.angularjs.org/api/ng/service/$http#transforming-requests-and-responses).*

### httpGet and httpPost

* list items are fetched using a built in async http mechanism, so that the user doesn't have to implement that.
* the url property defines the URL to use.
* the optional optionsCallback can be used to add to or change the options with information known in runtime. 
* httpPost-options has a "parameter"-property, that contains the JSON that will be POST:ed to the server.

### Handling errors from asynchronous callbacks
For asyncCallback, httpGet and httpPost, there is an option, `onPopulationError`.

If set to a callback function, and in case of a http error, the callback is called.
Its parameters are: the form of the field(where they key and options are), the data and the status.

See app.js for an example of its usage. Try and rename test/testdata.js and you'll see it being called.

## Statically setting the list items

This is done by either using the JSON-schema enum-property, or by manually setting form.titleMap.

# UI-Select
The support for angular-ui-select was added in the 0.9.0-version, and is currently partial, but getting there.

The currently supported UI-select specific/native options are:
* Single: tagging, taggingTokens, taggingLabel, refreshDelay, searchDescription, uiClass   
* Multiple select: refreshDelay, uiClass, groupBy(only multiple)

## Installation

UI-select is not installed by default in ASFDS, even though it is featured in the demo and example, here is how to make it work:

### Dependencies

Its dependencies aren't included in the package.json, and will hence have to be installed manually, here is a script:

```bash
 $  bower install angular-ui-select angular-underscore underscore angular-ui-utils angular-translate angular-ui-select angular-ui-utils angular-sanitize
```
### HTML
Include all relevant files:
```html
<link href="bower_components/angular-ui-select/dist/select.css" rel="stylesheet" />

<script src="https://code.jquery.com/jquery-2.1.4.js"></script>
<script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script src="bower_components/underscore/underscore-min.js"></script>
<script src="bower_components/angular-underscore/angular-underscore.js"></script>
<script src="bower_components/angular-ui-utils/ui-utils.js"></script>
<script src='bower_components/angular-ui-select/dist/select.js'></script>
```    
### Angular module configuration

UI-select have several additional dependencies that need to be added to your module configuration:

```bash
angular.module('yourModule', ['schemaForm', 'mgcrea.ngStrap', 'mgcrea.ngStrap.modal', 'pascalprecht.translate', 'ui.select', 'ui.highlight','mgcrea.ngStrap.select']);
```    


### Forms
It is used as strapselect, but by including the form types uiselect and uiselectmultiple instead. 
```js
    {
        "key": 'uiselectmultiple',
        "type": 'uiselectmultiple',
        "titleMap": [
          { value: 'one', name: 'option one'},
          { value: 'two', name: 'option two'},
          { value: 'three', name: 'option three'}
        ]
    },
```        
It supports dynamically fetching items from a backend using callbacks and http-methods, but works a little bit different from AngularStrap internally, so filters, for example, aren't implemented yet.

See the example app in the source for more details on how to use it.

# Recommendations

* Choose httpGet and httpPost over the callback and asyncCallback methods if your don't specifically need the full freedom
of callback and asyncCallback. There is no reason clutter client code with http-request handling unless you have to.
* Given the asynchronous nature of javascript development, try use asynchronous alternatives before synchronous that block the UI.
* The way the plug-ins works, they register themselves as defaults for all matching types. <br />
As long this is the case, all relevant fields must specify the "type"-property. <br />
If not, they will get the wrong editor. Either way, it is recommended to define the type.


# Building

Building and minifying is done using [gulp](http://gulpjs.com/) 

### Installing gulp and requrements
To install gulp, you need npm to be installer, however, we want a local bower install:
```bash
sudo npm install bower
node_modules/bower/bin/bower install
```
And then install the rest of the depencies
```bash
sudo npm install
```
*The instructions are for Linux, to install under windows, the same commands adjusted for windows should work*

### Running the build

In the project root folder, run:

```bash
$ gulp default
```

# Contributing

Pull requests are always very welcome. Try to make one for each thing you add, don't do [like this author(me) did](https://github.com/chengz/schema-form-strapselect/pull/2).

Remember that the next version is in the develop branch, so if you want to add new features, do that there.<br />
If you want to fix a bug, do that against the master branch and it will be merged into the develop branch later.



# Testing

Unit testing is done using [Karma and Jasmine](http://karma-runner.github.io/0.12/intro/installation.html).
The main configuration file for running tests is karma.conf.js, and test/tests.js holds the test code.
First, make sure the relevant development dependencies are installed:

```bash
$ npm update
```

To run the tests:


```bash
$ node_modules/karma/bin/karma start karma.conf.js
```
# Breaking change history

<b>Important: Over the early minor versions, there has been considerable changes:</b>

* 0.3.0: all dynamic-select-related settings moved to the form.
* 0.3.3: value/name-pairs for drop down data is deprecated.<br />
The correct way, and how the HTML select element actually works, is value/text.(note: Reverted in 0.8.0)<br />
The the add-on still supports both variants, but value/name will be removed.<br /> 
* 0.4.0: use the options.map functionality instead.<br /> 
* 0.5.0: Breaking changes:
  * http_post and http_get are renamed to httpPost and httpGet.
  * async.callback is removed and asyncCallback is used instead.
* 0.6.0: earlier deprecated support for value/name-pairs is now removed 
* 0.7.0: meant a forced update of dependencies and some rewriting, since:
  * 2.2.1 of angular-strap has breaking changes making it impossible to keep backwards compatibility.
  * 0.8.0 of angular-schema-form, which also has breaking changes had to be updated to stay compatible with angular-straps' dependencies.
* 0.8.0: Harmonization with angular-schema-form to be a drop-in replacement
  * Breaking change: The items array is now renamed to titleMap, as in ASF.
  * Value/name-pairs for drop-down data is now reintroduced (value/text is still supported)
* 0.9.0: Breaking changes: strapselectdynamic, strapmultiselect and strapmultiselect was merged into strapselect. 

Note: no further API changes are planned.


# History

1. This component was originally created by [chengz](https://github.com/chengz/). 

2. [stevehu](https://github.com/stevehu) then added functionality to his project to connect to his [light
framework](https://github.com/networknt/light).

3. This inspired [nicklasb](https://github.com/nicklasb) to merge stevehu:s code and rewrite the plugin in order to:

* harmonize it with the current lookup handling in angular-schema-form
* generalize it for it to be able to connect to any backend. 

The rest is extremely recent history(i.e. > 0.3.0).
