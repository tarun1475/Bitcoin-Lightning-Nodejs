cd $1
echo "Making docs directory..."
mkdir -p docs/templates
echo "Installing jsdoc and docdash...."
npm install --save jsdoc docdash
echo '{
    "tags": {
        "allowUnknownTags": false
    },
    "source": {
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown"
    ],
    "opts": {
        "template": "assets/template/docdash/",
        "encoding": "utf8",
        "destination": "docs/",
        "recurse": true,
        "verbose": true
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
			  "default" : {
						"outputSourceFiles" : false
				}
    }
}' > docs/conf.json

echo "Generating html docs..."

node_modules/.bin/jsdoc -c docs/conf.json -t node_modules/docdash/ routes/*.js
