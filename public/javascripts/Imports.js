module.exports = {
    setup: () => {
        const fs = require('fs');
        const java = require('java');
        const mvn = require('node-java-maven');

        java.classpath.push("./public/libSBOLj3.jar");


        mvn(function (err, mvnResults) {
                if (err) {
                    return console.error('could not resolve maven dependencies', err);
                }
                mvnResults.classpath.forEach(function (c) {
                    java.classpath.push(c);
                });
            }
        );
//setting sync method suffix to _ to avoid Sync issues
        java.asyncOptions = {
            asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
            syncSuffix: "_",              // Sync methods use the base name(!!)
            promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
            promisify: require('util').promisify // Needs Node.js version 8 or greater, see comment below
        };


//import classes from Java library
        let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
        let ComponentType = java.import("org.sbolstandard.vocabulary.ComponentType");
        let Role = java.import("org.sbolstandard.vocabulary.Role");
        let Arrays = java.import("java.util.Arrays");
        let List = java.import("java.util.ArrayList")
        let SBOLIO = java.import("org.sbolstandard.io.SBOLIO");
        let File = java.import("java.io.File");
        let SBOLAPI = java.import("org.sbolstandard.api.SBOLAPI");
        let identified = java.import("org.sbolstandard.entity.Identified");
        let component = java.import("org.sbolstandard.entity.Component");
        let URI = java.import("java.net.URI");
        let RDFUtil = java.import("org.sbolstandard.util.RDFUtil");
        let DataModelSubComponent = java.import("org.sbolstandard.vocabulary.DataModel$SubComponent");
        let DataModelCut = java.import("org.sbolstandard.vocabulary.DataModel$Cut");
        let LocationFactory = java.import("org.sbolstandard.entity.Location$LocationFactory");
//let LocationFactory = java.import("org.sbolstandard.entity.Location");
        let URINameSpace = java.import("org.sbolstandard.util.URINameSpace");
        let Location = java.import("org.sbolstandard.entity.Location");
        let CutLocation = java.import("org.sbolstandard.entity.CutLocation");
        let Range = java.import("org.sbolstandard.entity.RangeLocation");
        let ModelFactory = java.import("org.apache.jena.rdf.model.ModelFactory");
        let InputStream = java.import("java.io.FileInputStream");
        let Sequence = java.import("org.sbolstandard.entity.Sequence");
//get json data from middleware and write it into file
        let json = JSON.stringify(data);
        fs.writeFileSync("./public/javascripts/LD.jsonld", "");
        fs.writeFileSync("./public/javascripts/LD.jsonld", json);
        let fileRead = new File("public/javascripts/LD.jsonld");

//create new instances of Java classes
        let rdfUtil = new RDFUtil();
        let locationFactory = new LocationFactory();
        let ArrayList = new List();
        let uri = new URI("");
        let API = new SBOLAPI();
        let io = new SBOLIO();
        let is = new InputStream(fileRead);
    }
}