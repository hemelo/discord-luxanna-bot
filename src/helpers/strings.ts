export class StringUtils {
    
    //static titleCase = (str: string) => str.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
    
    static titleCase = function(toChange: string) {
        
        var i, j, str, lowers, uppers;
        
        str = toChange.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        // Certain minor words should be left lowercase unless 
        // they are the first or last words in the string
        lowers = ['A', 'De', 'Com', 'O', 'As', 'Os', 'E', 'Nem', 'Também', 'Mas', 'Porém', 'Todavia', 'Contudo',
                'Entretanto', 'Logo', 'Porque', 'Pois', 'Portanto', 'Assim', 'Que', 'Porque', 'Pois'];

        for (i = 0, j = lowers.length; i < j; i++)
            str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), txt => txt.toLowerCase());

        // Certain words such as initialisms or acronyms should be left uppercase
        uppers = ['Id', 'Tv'];

        for (i = 0, j = uppers.length; i < j; i++)
            str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), uppers[i].toUpperCase());
        
        return str;
    }
}