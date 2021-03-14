const express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    popsReceiver = fs.readFileSync("./public/jsonld/BBa_F2620_PoPSReceiver/BBa_F2620_PoPSReceiver.jsonld").toString(),
    combine2020 = fs.readFileSync("./public/jsonld/combine2020/combine2020.jsonld").toString(),
    multicellular = fs.readFileSync("./public/jsonld/multicellular/multicellular.jsonld").toString(),
    toggleSwitch = fs.readFileSync("./public/jsonld/toggle_switch/toggle_switch.jsonld").toString();


router.get('/', (req, res) => {

    let files = [
        ["Pops Receiver", popsReceiver, 0],
        ["Combine2020", combine2020, 1],
        ["MultiCellular", multicellular, 2],
        ["Toggle Switch", toggleSwitch, 3]
    ];
    res.render('examples', {

        description: 'Examples',
        language: 'en-GB',
        data: {author: 'Jake Sumner', university: 'Keele University'},
        title: 'SBOL Visual',
        tagline: 'SBOL Visual is a web-based visualisation tool',
        keywords: ['SBOL', 'Visualisation', 'Synthetic Biology', 'SBOL v3', 'Glyph Creator'],
        copyright: 'Jake Sumner &copy; 2020',
        files: files
    });
});


module.exports = router;
