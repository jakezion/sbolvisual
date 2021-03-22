/*TODO
   Check:
        PopsReceiver => Works
        Combine 2020 => Works
        Annotation => FIX
        Attachment => FIX
        Collection => FIX
        Component Urn Uri => FIX
        Implementation => FIX
        Interface => FIX
        Model => FIX
        Measurement => FIX
        Measurement Using Units From OM => FIX
        Multicellular => Works
        Multicellular Simple => FIX
        Activity => FIX
        Agent => FIX
        Plan => VERY BROKEN
        Toggle Switch => Works
 */
const fs = require('fs');
const java = require('java');
const Component = require('./Components.js');
const FeatureComponent = require('./FeatureComponents.js');

java.classpath.push("./public/libSBOLj3.jar");

//setting sync method suffix to _ to avoid Sync issues
java.asyncOptions = {
    asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
    syncSuffix: "_",              // Sync methods use the base name(!!)
    promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
    promisify: require('util').promisify // Needs Node.js version 8 or greater, see comment below
};

module.exports = class setDocument {

    constructor(data, format) {

        try {
            //import classes from Java library
            this.SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
            this.File = java.import("java.io.File");
            this.component = java.import("org.sbolstandard.entity.Component");
            this.URI = java.import("java.net.URI");
            this.Range = java.import("org.sbolstandard.entity.RangeLocation");
            this.ModelFactory = java.import("org.apache.jena.rdf.model.ModelFactory");
            this.InputStream = java.import("java.io.FileInputStream");
            this.Sequence = java.import("org.sbolstandard.entity.Sequence");

            this.json = JSON.stringify(data);
            fs.writeFileSync("./public/javascripts/LD.jsonld", "");
            fs.writeFileSync("./public/javascripts/LD.jsonld", this.json);
            let fileRead = new this.File("public/javascripts/LD.jsonld");

            //create new instances of Java classes
            this.uri = new this.URI("");
            this.is = new this.InputStream(fileRead);

            //create SBOL document with a model based on the https://synbiohub.org/public/igem/ URI
            this.modelFactory = this.ModelFactory.createDefaultModel_();
            this.model = this.modelFactory.read_(this.is, "https://synbiohub.org/public/igem/", format);
            this.doc = new this.SBOLDocument(this.model);

            //return components and their objects to be sent to middleware
            //return this.getComponents(this.doc);

        } catch (e) {
            console.log(e);
        }
    }

    //sorts the subcomponents based on the start number of their ranges
    sortComponents(components) {
        return components.sort((a, b) => (a.start > b.start) ? 1 : -1);
    }

    getSubComponents(subcomponent) {
        this.componentFeatureTest = new FeatureComponent(subcomponent, this.doc, this.uri, this.Range);
        return this.componentFeatureTest.components();
    }

    getComponents() {


        let map = new Map();
        let testObjectComponents = [];
        for (let x = 0; x < this.doc.getComponents_().size_(); x++) {
            let component = this.doc.getComponents_().get_(x);
            let componentTest = new Component(component, this.doc, this.uri, this.Sequence);
            testObjectComponents.push(componentTest.components());
        }

        testObjectComponents.filter(x => x.subcomponents.length !== 0).forEach((component) => {
            let subcomponentObject = [];

            component.subcomponents.forEach((subcomponent) => {
                let components = this.getSubComponents(subcomponent);

                if (components.start && components.end !== undefined) {
                    subcomponentObject.push(components);
                }
            });

            if (subcomponentObject.length !== 0) {
                this.sortComponents(subcomponentObject);
                component.subcomponents.length = 0;
                component.subcomponents = subcomponentObject.slice(0);
                //TODO FIX
            } else {
                // console.log("component", component);
                component.subcomponents.forEach((subcomponent) => {
                    subcomponentObject.push(this.getSubComponents(subcomponent));
                });
                component.subcomponents = subcomponentObject;
                // testObjectComponents.push(subcomponentObject); //TODO FIX
            }
            //testObjectComponents.push(subcomponentObject);
            //console.log("components2", subcomponentObject);
        });


        testObjectComponents.forEach((component) => {
            map.set(component.displayID, component);
        });

        return map;
    }
};
