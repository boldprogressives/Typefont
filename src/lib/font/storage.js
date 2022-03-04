/**
 * @module FontStorage Used to fetch fonts.
 * @author Vasile Pește <sirvasile@protonmail.ch>
*/

export const FontStorage = (
    function (undefined)
    {
        /**
         * _fetch Used to retrieve and deserialize a JSON structure stored in a file.
         * @param {String} url The URL of the file to fetch.
         * @param {Object} [options = {}]
         * @return {Promise}
        */
        
        const _fetch = (url, options = {}) => {
            const {
                // Used as request timeout [ms].
                fontRequestTimeout = 2000
            } = options;
            
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                
                xhr.open("GET", url);
                xhr.timeout = fontRequestTimeout;
                xhr.onload = (e) => {
                    const result = {};
                    
                    result.exists = e.target.status != 404;
                    
                    if (result.exists) {
                        try {
                            result.content = JSON.parse(e.target.responseText);
                        }
                        catch (ex) {
                            reject(ex);
                        }
                    }
                    
                    resolve(result);
                };
                xhr.onerror = xhr.onabort = reject;
                xhr.send();
            });
        };
        
        /**
         * _requestFontsIndex Used to request a index of fonts.
         * Established the following JSON structure for a index of fonts.
         * {
         *     "index": [
         *         "font-name",
         *         "font-name-1",
         *         "font-name-2",
         *         ...
         *     ]
         * }
         * @param {String} url The URL of the index of fonts file.
         * @param {Object} [options = {}]
         * @return {Promise}
        */
        
        const _requestFontsIndex = async (url, options = {}) => {
            const request = await _fetch(url, options);
            const content = request.content;
            
            if (!Array.isArray(content.index))
                content.index = [];
            
            return content;
        };
        
        /**
         * _requestFont Used to request a font.
         * Established the following JSON structure for a font.
         * {
         *     "meta": {
         *         "name": "...,
         *         "author": "...",
         *         "uri": "...",
         *         "key": "value",
         *         ...
         *     },
         *     "alpha": {
         *         "a": "base64",
         *         "b": "base64",
         *         "c": "base64",
         *         ...
         *     }
         * }
         * @param {String} url The URL of the font file.
         * @param {Object} [options = {}]
         * @return {Promise}
        */
        
        const _requestFont = async (url, options = {}) => {
            const request = await _fetch(url, options);
            const alpha = request.content.alpha;
            const meta = request.content.meta;
            
            if (typeof alpha === "object")
                for (const symbol in alpha)
                    alpha[symbol] = `data:image/png;base64,${alpha[symbol]}`;
            else
                request.content.alpha = {};
            
            if (typeof meta !== "object")
                request.content.meta = {};
            
            return request.content;
        };
        
        // Return the public context.
        return {
            requestFontsIndex: (url, options) => _requestFontsIndex(url, options),
            requestFont: (url, options) => _requestFont(url, options)     
        };
    }
());