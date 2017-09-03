var Preludio = function()
{
    function _isString(myVar)
    {
        return (typeof myVar === 'string' || myVar instanceof String);
    }

    function _extension(fileName)
    {
        return fileName.split('.').pop().toLowerCase();
    }

    function _already(file, ext)
    {
        switch (ext) {
            case 'js':
                var query = 'script[src="' + file + '"]';
                break;
            case 'css':
                var query = 'link[href="' + file + '"]';
                break;
        }

        return document.querySelectorAll(query).length;
    }

    function _loadCss(styles)
    {
        var doc      = document;
        var html     = styles.join("\n");
        var fragment = document.createRange().createContextualFragment(html);
        document.head.appendChild(fragment);
    }

    function _loadJs(scripts)
    {
        window.addEventListener('DOMContentLoaded', function() {
            var doc = document;
            var fragment = doc.createRange().createContextualFragment(scripts.join("\n"));
            doc.body.appendChild(fragment);
        });
    }

    Preludio.prototype.load = function(param1, param2)
    {
        var element    = (_isString(param1)) ? param1 : false;
        var urls       = (_isString(param1)) ? param2 : param1;
        var haveToLoad = (!element || document.querySelectorAll(element).length);
        if (haveToLoad) {
            var jsFiles  = [];
            var cssFiles = [];
            for (i in urls) {
                var ext       = _extension(urls[i]);
                var file      = urls[i];
                var isAlready = _already(file, ext);
                if (!isAlready) {
                    switch (ext) {
                        case 'js':
                            var jsFile = '<script type="text/javascript" src="' + file + '"></script>';
                            if (!jsFiles.includes(jsFile)) {
                                jsFiles.push(jsFile);
                            }
                            break;
                        case 'css':
                            var cssFile = '<link type="text/css" rel="stylesheet" href="' + file + '">';
                            if (!cssFiles.includes(cssFile)) {
                                cssFiles.push(cssFile);
                            }
                            break;
                    }
                }
            }

            if (cssFiles.length) {
                _loadCss(cssFiles);
            }
            if (jsFiles.length) {
                _loadJs(jsFiles);
            }
        }

        return this;
    }
}
