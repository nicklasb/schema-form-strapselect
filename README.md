[![Bower version](https://badge.fury.io/bo/angular-schema-form-dynamic-select.svg)](http://badge.fury.io/bo/angular-schema-form-dynamic-select)

Angular Strap Dynamic Select add-on
===================================

[![Join the chat at https://gitter.im/OptimalBPM/angular-schema-form-dynamic-select](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OptimalBPM/angular-schema-form-dynamic-select?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The dynamic select add-on uses [angular-strap-select](https://github.com/mgcrea/angular-strap/tree/master/src/select)
 to provide a drop down interface to [angular-schema-form](https://github.com/Textalk/angular-schema-form). 

Features:

* Static and dynamic lists
* Single and multiple select
* Convenient HTTP GET/POST and property mapping functionality
* Filters
* Sync and Async callbacks
* All callbacks referenced either by name (string) or reference
* [Angular schema form options](https://github.com/Textalk/angular-schema-form/blob/development/docs/index.md#standard-options)
  * Supported:
    * key, type, title, description, placeholder
    * notitle, onChange, condition
    * htmlClass, labelHtmlClass and fieldHtmlClass
  * Not supported(will be added):  
    *  readonly, copyValueTo, 
  * Not applicable(will not be added due to the nature of drop downs, [disagree?](https://github.com/OptimalBPM/schema-form-dynamic-select/issues)):
    * validationMessage, feedback
    
   
<b>Important: Over the early minor versions, there has been considerable architectural changes:</b>

* 0.3.0 all dynamic-select-related settings moved to the form.
* 0.3.3 value/name-pairs for drop down data is deprecated.<br />
The correct way, and how the HTML select element actually works, is value/text.<br />
The the add-on still supports both variants, but value/name will be removed.<br /> 
* 0.4.0 use the options.map functionality instead.<br /> 
* 0.5.0 Breaking changes:
  * http_post and http_get are renamed to httpPost and httpGet.
  * async.callback is removed and asyncCallback is used instead.
* 0.6.0 earlier deprecated support for value/name-pairs is now removed 


Note: no further API changes are planned.

# Glossary

* List items: the items that make up the selection list, for example the items in a drop down.

# Installation

This is an add-on to the angular-schema-form. To use it (in production), just include
`angular-schema-form-dynamic-select.min.js` and satisfy its dependency.

Easiest way is to install is with bower, this will also include dependencies:

```bash
$ bower install angular-schema-form-dynamic-select
```

If you want to use the develop branch:

```bash
$ bower install angular-schema-form-dynamic-select#develop
```

\#develop is not recommended for production, but perhaps you want to use stuff from the next version in development.


You'll need to load a few additional files to use the editor:

**Be sure to all the files of this project *after* you load angular schema form**

Example

```HTML
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

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm', 'mgcrea.ngStrap']);
```

#Usage

Usage is straightforward, simply include and reference.

## Form types

The add-on contributes the following new form types, `strapselect`, `strapmultiselect`,`strapselectdynamic`, `strapmultiselectdynamic`.


| Form type             |   Control  |
|:-------------------|:------------:|
| strapselect   |strap select static content|
| strapmultiselect   |strap multi select static content|
| strapselectdynamic   |strap select dynamically loaded content|
| strapmultiselectdynamic   |strap multi select dynamically loaded content|

Built-in select-controls gets the bootstrap look but retain their functionality.




## Form Definition
All settings reside in the form definition. See the [app.js](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/blob/master/app.js) file for this example in use.

    $scope.form = [


### Single select from static list
The drop down items are defined by and array of value/text objects residing in the form

     {
       "key": 'select',
       "type": 'strapselect',
       "items": [
          {"value": 'value1', "text": 'text1'},
          {"value": 'value2', "text": 'text2'},
          {"value": 'value3', "text": 'text3'}
        ]
     },
     
### Multiple select from static list
Like the above, but allows multiple items to be selected. 

     {
       "key": 'multiselect',
       "type": 'strapmultiselect',
        "items": [
            {"value": 'value1', "text": 'text1'},
            {"value": 'value2', "text": 'text2'},
            {"value": 'value3', "text": 'long very very long label3'}
        ]
     },
     
### Single select from dynamically loaded list via synchronous callback function
Callback must return an array of value/text objects (see static list above)
The "options" structure is passed to it as a parameter.

     {
       "key": "selectDynamic",
       "type": 'strapselectdynamic',
       "options": {
            "callback": $scope.callBackSD
       }
     },
     
### Multiple select from dynamically loaded list via synchronous callback function
Like strapselectdynamic above, but allowed multiple items to be selected.

     
     {
       "key": "multiselectDynamic",
       "type": 'strapmultiselectdynamic',
       "options": {
           "callback": $scope.callBackMSD
       }
     },
     
### Multiple select from asynchronous callback

The asyncCallback must return a http-style promise and the data must be a JSON array of value/text objects.
Note that in this example, the reference to the callback is a string, meaning a callback in the using controller scope.
     
     {
       "key": "multiselectDynamicAsync",
       "type": 'strapmultiselectdynamic',
       "options": {
           "asyncCallback": "callBackMSDAsync"
           }
       }
     },
### Multiple select from dynamically loaded list via http get
Convenience function, makes a get request, no need for callback.
Expects the server to return a JSON array of value/text objects.
     
     {
       "key": "multiselectDynamicHttpGet",
       "type": 'strapmultiselectdynamic',
       "options": {
           "httpGet": {
               "url" : "test/testdata.json"
           }
       }
     },
               
### Multiple select from dynamically loaded list via http post with an options callback
Like the get variant above function, but makes a JSON POST request passing the "parameter" as JSON.<br />
This example makes use of the optionsCallback property. 
It is a callback that like the others, gets the options structure
as a parameter, but allows its content to be modified and returned for use in the call. 
Here, the otherwise mandatory httpPost.url is not set in the options but in the callback.

See the stringOptionsCallback function in [app.js](https://github.com/OptimalBPM/angular-schema-form-dynamic-select/blob/master/app.js) for an example. 
The options-instance that is passed to the parameter is a *copy* of the instance in the form, 
so the form instance is not affected by any modifications by the callback.
     
     {
       "key": "multiselectDynamicHttpPost",
       "type": 'strapmultiselectdynamic',
       "options": {
           "httpPost": {
               "optionsCallback" : "stringOptionsCallback",
               "parameter": { "myparam" : "Hello"}
           }
       }
     },


### Property mapping
The HTML select standard naming is value/text, but that is sometimes difficult to get from a server, 
it might not support it.
Therefore, a "map"-property is provided. <br />
The property in valueProperty says in what property to look for the value, and textProperty the text.
In this case:

    {nodeId : 1, nodeName: "Test", "nodeType": "99"}
which cannot be used, is converted into:

    {value : 1, text: "Test", nodeId : 1, nodeName: "Test", "nodeType": "99"}
which is the native format with the old options retained to not destroy auxiliary information.
For example, a field like "nodeType" might be used for filtering(see Filters section, below). 
The options for that mapping look like this:

     {
       "key": "multiselectdynamic_http_get",
       "type": 'strapmultiselectdynamic',
       "options": {
            "httpGet": {
                "url": "test/testdata_mapped.json"
            },
            "map" : {valueProperty: "nodeId", textProperty: "nodeName"}
       }
     },    
     
This is convenience functionality, for more complicated mappings, and situations where the source data is
in a completely different format, the callback and asyncCallback options should be used instead.

## Filters

Filters, like [conditions](https://github.com/Textalk/angular-schema-form/blob/development/docs/index.md#standard-options) 
handle visibility, but for each item in the options list.

It works by evaluating the filter expression for each row, if it evaluates to true, the option remains in the list.
One could compare it with an SQL join.
 
The options are:

* filter : An expression, evaluated in the user scope, with the "item" local variable injected. "item" is the current list item, `"model.select==item.category"`
* filterTrigger : An array of expressions triggering the filtering, `"model.select"`


    {
        "key": 'multiselect',
        "type": 'strapmultiselect',
        options: {
            "filterTriggers": ["model.select"],
            "filter" : "model.select==item.category"
        },
        "items": [
            {"value": 'value1', "text": 'text1', "category": "value1"},
            {"value": 'value2', "text": 'text2', "category": "value1"},
            {"value": 'value3', "text": 'long very very long label3'}
        ]
    },

Note on filterTrigger and why not having a watch on the entire expression:

* The expression is actually a one-to-many join, and mixes two scopes in the evaluation. This might not always be handled the same by $eval. 
* Adding watches for the expression would mean having to add one watch for each list item, long lists would mean a huge overhead.
* Also, there might be use cases where triggering should be triggered by other conditions. Or not be triggered for some other reason.


### And then a submit button. 
Not needed, of course, but is commonly used.

     {
       type: "submit",
       style: "btn-info",
       title: "OK"
     }
     
And ending the form element array:

    ];
    

# Feature summary

The options.items property in form holds the list items(also in the dynamic variants).

All select types can handle:

* property mappings
* filters

## strapselect and strapmultiselect
These types are static, which means that the list of items is statically defined in the form:

## strapselectdynamic and strapmultiselectdynamic
These types are dynamic and fetches their data from different back ends.
#### Callbacks in general
Callbacks can be defined either by name(`"loadGroups"`) or absolute reference (`$scope.loadGroups`). 

The name is actually is an expression evaluated in the user scope that must return a function reference.
This means that it *can* be `"getLoadFunctions('Groups')"`, as long as that returns a function reference.

But the main reason for supporting referring to functions both by name and reference is that forms 
often is stored in a database and passed from the server to the client in [pure JSON format](http://stackoverflow.com/questions/2904131/what-is-the-difference-between-json-and-object-literal-notation),
and there, `callback: $scope.loadGroups` is not allowed.

#### Callback results
The results of all callbacks can be remapped using the "map" property described above.

The two methods of callback mechanisms are:

### callback and asyncCallback

* list items are fetched by a user-specified callback. User implements the calling mechanism.
* the callback receive the form options as a parameter and returns an array of list items(see the static strapselect)

### httpGet and httpPost

* list items are fetched using a built in async http mechanism, so that the user doesn't have to implement that.
* the url property defines the URL to use.
* the optional optionsCallback can be used to add to or change the options with information known in runtime. 
* httpPost-options has a "parameter"-property, that contains the JSON that will be POST:ed to the server.

# Recommendations

* Choose httpGet and httpPost over the callback and asyncCallback methods if your don't specifically need the full freedom
of callback and asyncCallback. There is no reason clutter client code with http-request handling unless you have to.
* Given the asynchronous nature of javascript development, try use asynchronous alternatives before synchronous that block the UI.
* The way the plug-ins works, they register themselves as defaults for all matching types. <br />
As long this is the case, all relevant fields must specify the "type"-property. <br />
If not, they will get the wrong editor. Either way, it is recommended to define the type.

# Example

In the repository, the index.html file, together with the bootstrap-strapselect.js file and the test/testdata.json file constitutes a working example.

To run it, simply clone the repository 
    
    git clone https://github.com/OptimalBPM/angular-schema-form-dynamic-select.git
    cd angular-schema-form-dynamic-select
    bower update

..and open index.html in a browser or serve using your favorite IDE.

# Bugs, omissions, feature requests 

Please [report *all* issues you encounter](https://github.com/OptimalBPM/schema-form-dynamic-select/issues)

If you suspect that there is a bug in angular-schema-form-dynamic-select that isn't reproducible in any of the examples,<br />
please make a small example in plunkr or similar where you recreate the problem, it will make it easier to help you.<br />

If something is difficult to understand, that is also an issue, please ask for clarification if the documentation is insufficient.

Any ideas on new features are always welcome.

# Building

Building and minifying is done using [gulp](http://gulpjs.com/) 

### Installing gulp
To install gulp, you need npm

    npm install gulp -g

### Running the build

In the project root folder, run:

    gulp default


# Contributing

Pull requests are always very welcome. Try to make one for each thing you add, don't do [like this author(me) did](https://github.com/chengz/schema-form-strapselect/pull/2).

Remember that the next version is in the develop branch, so if you want to add new features, do that there.<br />
If you want to fix a bug, do that against the master branch and it will be merged into the develop branch later.

# Testing

Unit testing is done using [Karma and Jasmine](http://karma-runner.github.io/0.12/intro/installation.html).
The main configuration file for running tests is karma.conf.js, and test/tests.js holds the tests.


# History

1. This component was originally created by [chengz](https://github.com/chengz/). 

2. [stevehu](https://github.com/stevehu) then added functionality to his project to connect to his light(https://github.com/networknt/light) 
framework.

3. This inspired [nicklasb](https://github.com/nicklasb) to merge stevehu:s code and rewrite the plugin in order to:

* harmonize it with the current lookup handling in angular-schema-form
* generalize it for it to be able to connect to any backend. 

The rest is extremely recent history(i.e. > 0.3.0).
