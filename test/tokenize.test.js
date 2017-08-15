const tokenize = require("../dist/js/bundle").default;


module.exports = {
    testLink(test){
        const url = "google.ru/search";
        const urlToken = tokenize(` ${url} `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testParamLink(test){
        const url = "google.ru/enter?a=b&c=d";
        const urlToken = tokenize(` ${url} `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testHashLink(test){
        const url = "google.ru/search?a=b&c=d#p_a_r%20a-m";
        const urlToken = tokenize(` ${url} `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testCyLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(` ${url} `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testBraLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`(${url})`)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testDotLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`.${url}.`)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testComLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`,${url},!? a`)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testSepLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`:${url}::: a`)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testQstLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`?${url}???. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testLnLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`-${url}--. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testLnLink(test){
        const url = "лл.рф/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`-${url}--. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testLocalhostLink(test){
        const url = "localhost/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(`-${url}--. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testHttpLink(test){
        const url = "http://произвольная-фигня";
        const urlToken = tokenize(`-?${url}--?. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testHttpsLink(test){
        const url = "https://произвольная-фигня?#";
        const urlToken = tokenize(`-?${url}--?. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },


    testHttpIpLink(test){
        const url = "http://127.0.0.1/ввод#вася-пупкин.рф?a=13%20b_x/4";
        const urlToken = tokenize(` ${url} `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"url");
        test.done();
    },

    testEmailLink(test){
        const url = "яяяя@яя.рф";
        const urlToken = tokenize(`-?${url}--?. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"email");
        test.done();
    },

    testMailToEmailLink(test){
        const url = "mailto:яяяя@яя.несуществуетдомена";
        const urlToken = tokenize(`-?${url}--?. `)[1];
        test.equal(String(urlToken),url);
        test.equal(urlToken.type,"email");
        test.done();
    },


    testWrongEmailLink(test){
        const url = "яяяя@яя.несуществуетдомена";
        const urlToken = tokenize(`-?${url}--?. `)[1];
        test.notEqual(String(urlToken),url);
        test.done();
    },

};