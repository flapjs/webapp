/* eslint-env node */

const fs = require('fs');

// SOURCE: https://gist.github.com/adamwdraper/4212319
function walk(dir, callback = () => {}, done = () => {})
{
    fs.readdir(dir, function (error, list)
    {
        if (error)
        {
            return done(error);
        }

        var i = 0;

        (function next ()
        {
            var file = list[i++];

            if (!file)
            {
                return done(null);
            }
            
            file = dir + '/' + file;
            
            fs.stat(file, function (error, stat)
            {
                if (stat && stat.isDirectory())
                {
                    walk(file, callback, function (error)
                    {
                        next();
                    });
                }
                else
                {
                    callback(file, stat);
                    next();
                }
            });
        })();
    });
}

module.exports = {
    walk
};
