ace.provide("ace.mode.HtmlHighlightRules");

ace.mode.HtmlHighlightRules = function() {

    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used

    this._rules = {
        start : [ {
            token : "text",
            regex : "<\\!\\[CDATA\\[",
            next : "cdata"
        }, {
            token : "xml_pe",
            regex : "<\\?.*?\\?>"
        }, {
            token : "comment",
            regex : "<\\!--",
            next : "comment"
        }, {
            token : "text",
            regex : "<(?=\s*script)",
            next : "script"
        }, {
            token : "text", // opening tag
            regex : "<\\/?",
            next : "tag"
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "text",
            regex : "[^<]+"
        } ],

        script : [ {
            token : "text",
            regex : ">",
            next : "js-start"
        }, {
            token : "keyword",
            regex : "[-_a-zA-Z0-9:]+"
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        } ],

        tag : [ {
            token : "text",
            regex : ">",
            next : "start"
        }, {
            token : "keyword",
            regex : "[-_a-zA-Z0-9:]+"
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "string",
            regex : '".*?"'
        }, {
            token : "string",
            regex : "'.*?'"
        } ],

        cdata : [ {
            token : "text",
            regex : "\\]\\]>",
            next : "start"
        }, {
            token : "text",
            regex : "\\s+"
        }, {
            token : "text",
            regex : ".+"
        } ],

        comment : [ {
            token : "comment",
            regex : ".*?-->",
            next : "start"
        }, {
            token : "comment",
            regex : ".+"
        } ]
    };

    var jsRules = new ace.mode.JavaScriptHighlightRules().getRules();
    this._addRules(jsRules, "js-");
    this._rules["js-start"].unshift({
        token: "text",
        regex: "<\\/(?=script)",
        next: "tag"
    });
};


ace.mode.HtmlHighlightRules.prototype._addRules = function(rules, prefix) {
    for (var key in rules) {
        var state = rules[key];
        for (var i=0; i<state.length; i++) {
            var rule = state[i];
            if (rule.next) {
                rule.next = prefix + rule.next;
            }
        }
        this._rules[prefix + key] = state;
    }
};

ace.mode.HtmlHighlightRules.prototype.getRules = function() {
    return this._rules;
};