var Template = (function () {
    function Template() {
    }
    Template.init = function () {
        Handlebars.registerHelper('language-text', function (num) {
            if (num == Language.Java) {
                return 'Java';
            }
            else if (num == Language.JavaScript) {
                return 'JavaScript';
            }
            else if (num == Language.PHP) {
                return 'PHP';
            }
            return 'All';
        });
        Handlebars.registerHelper('next-language', function (num) {
            if (num == Language.Java) {
                return '&language=js';
            }
            else if (num == Language.JavaScript) {
                return '&language=php';
            }
            else if (num == Language.PHP) {
                return '';
            }
            return '&language=java';
        });
        Handlebars.registerHelper('rule-tags-visibility', function (tags) {
            if (!tags || tags == "" || (Array.isArray(tags) && tags.length == 0)) {
                return 'display: none;';
            }
            return '';
        });
        Handlebars.registerHelper('rule-severity-visibility', function (severity) {
            if (!severity) {
                return 'display: none;';
            }
            return '';
        });
        Handlebars.registerHelper('tab-activation', function (index, max, selectedIndex) {
            if (selectedIndex >= max) {
                if (index == 0) {
                    return 'checked';
                }
                return '';
            }
            if (selectedIndex == index) {
                return 'checked';
            }
            return '';
        });
        Handlebars.registerHelper('rule-tags-render', function (tags) {
            return tags.join(', ');
        });
        Template.RuleMenuItem = Handlebars.compile(Template.RuleMenuItem);
        Template.RuleMenuHeaderVersion = Handlebars.compile(Template.RuleMenuHeaderVersion);
        Template.RuleMenuHeaderVersionError = Handlebars.compile(Template.RuleMenuHeaderVersionError);
        Template.RulePageContent = Handlebars.compile(Template.RulePageContent);
        Template.RuleErrorPageContent = Handlebars.compile(Template.RuleErrorPageContent);
        Template.RuleFilterElement = Handlebars.compile(Template.RuleFilterElement);
    };
    Template.eval = function (template, context) {
        return template(context);
    };
    Template.RuleMenuItem = '<li><a  class="rule-link" href="#version={{currentVersion}}&ruleId={{rule.Key}}" title="{{rule.Key}}: {{rule.Data.0.Title}}">{{rule.Key}}: {{rule.Data.0.Title}}</a></li>';
    Template.RuleMenuHeaderVersion = ('<h2>List of rules</h2>' +
        '<span id="rule-version-cont">' +
        '<a id="rule-version" href="#version={{controller.currentVersion}}">in version {{controller.currentVersion}}</a>' +
        '<a id="language-selector" class="rule-link" href="#version={{controller.currentVersion}}{{next-language language}}" title="Toggle rule language">{{language-text language}}</a>' +
        '</span>');
    Template.RuleMenuHeaderVersionError = '<span id="rule-version-cont"><a href="#">Go to latest version</span></a>';
    Template.RulePageContent = ('<div class="rule-details-container tabs">' +
        '{{#each Data}}' +
        '<div class="rule-details tab">' +
        '<input type="radio" id="rule-detail-tab-{{../Key}}-{{@index}}" name="rule-detail-tab-group-{{../Key}}" {{{tab-activation @index ../Data.length 0}}}/>' +
        '<label for="rule-detail-tab-{{../Key}}-{{@index}}">{{language-text Language}}</label>' +
        '<div class="tab-content">' +
        '<div class="rule-meta">' +
        '<h1 id="rule-title">{{Title}}</h1>' +
        '<span id="rule-id" class="id">Rule ID: {{../Key}}</span>' +
        '<div class="rules-detail-properties">' +
        '<span class="tags" id="rule-tags" title="Tags" style="{{{rule-tags-visibility Tags}}}">{{rule-tags-render Tags}}</span>' +
        '<span class="severity rule-severity-{{Severity}}" id="rule-severity" title="Severity" style="{{{rule-severity-visibility Severity}}}">{{Severity}}</span>' +
        '</div>' +
        '</div>' +
        '<div class="rule-description" id="rule-description">{{{Description}}}</div>' +
        '</div>' +
        '</div>' +
        '{{/each}}' +
        '</div>');
    Template.RuleErrorPageContent = ('<div id="error">' +
        '<h1 id="rule-title">There was an error while processing your request</h1>' +
        '<span id="rule-id" class="id">{{message}}</span>' +
        '</div>');
    Template.RuleFilterElement = '<li><input type="checkbox" checked="checked" id="{{tag}}" /><label for="{{tag}}">{{tag}}</label></li>';
    Template.hack_static_run = Template.init();
    return Template;
})();
//# sourceMappingURL=Template.js.map