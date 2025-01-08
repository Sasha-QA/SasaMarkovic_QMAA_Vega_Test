# SasaMarkovic_QMAA_Vega_Test

In this repository we have Word document for manual part of the task, and files for automation part.

Test files ar located in the specs document, and everything else is added to their own folders and files, like selectors, and page objects.

To start tests, use these two commands:
npx wdio run wdio.conf.js --spec ./test/specs/testCases.js
and
npx wdio run wdio.conf.js --spec ./test/specs/endToEndCases.js
