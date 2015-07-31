for (var i = 0; i < 10; i++) {

    setInterval(function() {


        //create casper object
        var casper = require('casper').create({
            loadImages: false,
            webSecurityEnabled: false,
            ignoreSslErrors: true
                //logLevel: 'debug'
        });


        //set browser user agent
        casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X)');

        //Open URL 
        casper.start('http://oneplus.net/invites?kolid=PCMR10');
        casper.on("resource.error", function(resourceError) {
            console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
            console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
        });


        casper.then(function() {

            var faker = require('faker');

            var randomEmail = faker.internet.email();
            var splitEmail = randomEmail.split('@')
            var reqEmail = splitEmail[0] + '@mailnesia.com'
            console.log(reqEmail)

            // Click on LOGIN / SIGN UP
            this.sendKeys('input[id="email"]', reqEmail);
            casper.click("div.btn-submit-invite");

            //casper.capture('screen.png');
            console.log('Opened page with title \"' + this.getTitle() + '"');
        });

        casper.then(function() {
            casper.click("div.btn-submit-invite");
            //casper.capture('screen.png');
            console.log('Opened page with title \"' + this.getTitle() + '"');
        });

        casper.then(function() {
            casper.capture('screen' + i + ' .png');
        });

        casper.run(function() {

            //finish execution script 
            this.exit();
        });
    }, 10000);

};
