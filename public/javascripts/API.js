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
});

java.asyncOptions = {
    asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
    syncSuffix: "_",              // Sync methods use the base name(!!)
    promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
    promisify: require('util').promisify // Needs Node.js version 8 or greater, see comment below
};

module.exports = {

    setDocument: (data) => {
        try {

            let json = JSON.stringify(data);
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

            fs.writeFileSync("./public/javascripts/LD.jsonld", "");
            fs.writeFileSync("./public/javascripts/LD.jsonld", json);
            let fileRead = new File("public/javascripts/LD.jsonld");

            let rdfUtil = new RDFUtil();
            let locationFactory = new LocationFactory();
            let ArrayList = new List();
            let uri = new URI("");
            let API = new SBOLAPI();
            let io = new SBOLIO();
            let is = new InputStream(fileRead);

            let modelFactory = ModelFactory.createDefaultModel_();
            let model = modelFactory.read_(is, "https://synbiohub.org/public/igem/", "JSON-LD");
            let doc = new SBOLDocument(model);

            return getComponents(doc);

            function getRoles(so) {
                let search = so.toString().replace("SO:", "");
                if (search === "0000167") {
                    return "Promoter";
                } else if (search === "0000139") {
                    return "RBS";
                } else if (search === "0000316") {
                    return "CDS";
                } else if (search === "0000141") {
                    return "Terminator";
                } else if (search === "0000704") {
                    return "Gene";
                } else if (search === "0000057") {
                    return "Operator";
                } else if (search === "0000704") {
                    return "EngineeredGene";
                } else if (search === "0000234") {
                    return "mRNA";
                } else if (search === "35224") {
                    return "Effector";
                } else if (search === "0003700") {
                    return "TF";
                } else if (search === "0000289") {
                    return "FunctionalCompartment";
                } else if (search === "0000290") {
                    return "PhysicalCompartment";
                }
            }

            function componentType(sbo) {
                let search = sbo.toString().replace("SBO:", "");

                if (search === "0000251") {
                    return "DNA";
                } else if (search === "0000250") {
                    return "RNA";
                } else if (search === "0000252") {
                    return "Protein";
                } else if (search === "0000247") {
                    return "SimpleChemical";
                } else if (search === "0000253") {
                    return "NoncovalentComplex";
                } else if (search === "0000241") {
                    return "FunctionalEntity";
                } else if (search === "0005623") {
                    return "Cell";
                }
            }

            /*
                    function interactionType(sbo) {
                        let search = sbo.toString().replace("SBO:", "");
                        if (search === "000169") {
                            return "Inhibition";
                        } else if (search === "0000170") {
                            return "Stimulation";
                        } else if (search === "0000176") {
                            return "BiochemicalReaction";
                        } else if (search === "0000177") {
                            return "NonCovalentBinding";
                        } else if (search === "0000179") {
                            return "Degradation";
                        } else if (search === "0000589") {
                            return "GeneticProduction";
                        } else if (search === "0000168") {
                            return "Control";
                        } else {
                            return "";
                        }
                    }
            */

            function sortComponents(components) {
                let sorted = components.sort((a, b) => (a.startNum > b.startNum) ? 1 : -1);
                sorted.forEach((subcomponent) => {
                    delete subcomponent.startNum;
                    delete subcomponent.endNum;
                });
                return sorted;
            }

            function getComponents(doc) {
                let docComponents = [];
                let mainComponents = [];
                let locations = [];
                let sortedLocations;
                let features = [];
                let allComponents;

                for (let x = 0; x < doc.getComponents_().size_(); x++) {
                    let component = doc.getComponents_().get_(x);
                    docComponents.push(component);
                }
                docComponents.forEach((component) => {
                    component.getSubComponents_() ? features.push(component.getSubComponents_()) : "invalid";
                    component.getComponentReferences_() ? features.push(component.getComponentReferences_()) : "invalid";
                    component.getLocalSubComponents_() ? features.push(component.getLocalSubComponents_()) : "invalid";
                    component.getExternallyDefineds_() ? features.push(component.getExternallyDefineds_()) : "invalid";
                    component.getSequenceFeatures_() ? features.push(component.getSequenceFeatures_()) : "invalid";
                });

                //console.log("features", features);
                features.forEach((subcomponents) => {//1
                    let tempComponents = [];
                    let tempLocations = [];
                    let orderedLocations = [];
                    // console.log("sub", subcomponents);
                    subcomponents.toArray_().forEach((instance) => {//2
                        // console.log("instnace", instance);

                        let resource = doc.getRDFModel_().getResource_(instance.getUri_().toString_());
                        let it = resource.listProperties_();
                        let resources = [];
                        //let resources = new List();
                        if (it !== null) {
                            while (it.hasNext_()) {

                                let stmt = it.nextStatement_();
                                if (stmt.getPredicate_().toString_() === "http://sbols.org/v3#hasLocation") {

                                    let object = stmt.getObject_();
                                    if (object.isResource_()) {

                                        resources.push(object.asResource_());
                                    } else {

                                        console.log("error");
                                    }
                                }
                            }
                            if (resources.length !== 0) {
                                resources.forEach((resourceUri) => {
                                    let getUri = uri.resolve_(resourceUri.getURI_());
                                    let resourceRange = doc.getIdentified_(getUri, Range.class);
                                    let startRange = resourceRange.getStart_();
                                    let endRange = resourceRange.getEnd_();
                                    let orientation = instance.getOrientation_() ? instance.getOrientation_().toString_() : null;
                                    let instanceOf = instance.getIsInstanceOf_() ? instance.getIsInstanceOf_() : "invalid";
                                    let format = {

                                        subcomponent: instanceOf,
                                        orientation: orientation,
                                        startNum: startRange,
                                        endNum: endRange

                                    };
                                    tempLocations.push(format);
                                });
                            }
                        } else {

                            let instanceOf = instance.getIsInstanceOf_() ? instance.getIsInstanceOf_() : "invalid";
                            let orientation = instance.getOrientation_() ? instance.getOrientation_().toString_() : null;

                            tempComponents.push([instanceOf, orientation]);
                        }
                    });
                    if (tempLocations !== []) {
                        sortedLocations = sortComponents(tempLocations);
                        sortedLocations.forEach((ins) => {
                            if (ins !== null) {
                                orderedLocations.push([ins.subcomponent, ins.orientation]);
                            }
                        });

                        if (orderedLocations.length !== 0) {

                            locations.push(orderedLocations);
                        }
                    } else {
                        mainComponents.push(tempComponents);
                    }
                });
                if (locations.length !== 0) {
                    allComponents = getComponentURI(doc, locations);
                } else {
                    allComponents = getComponentURI(doc, mainComponents);
                }

                return getDisplayComponents(doc, allComponents);
            }


            function exists(arr, search) {
                return arr.some(row => row.includes(search));
            }

            function getComponentURI(doc, componentData) {
                let componentURIs = [];
                // let search = [];
                let docComponents = [];
                console.log("componentURI", componentData);
                for (let i = 0; i < doc.getComponents_().size_(); i++) {
                    let instanceComponent = doc.getComponents_().get_(i);
                    let instance = doc.getComponents_().get_(i).getDisplayId_();
                    docComponents.push([instanceComponent, instance]);
                }

                componentData.forEach((componentSequence) => {
                    let components = [];
                    componentSequence.forEach((component) => {
                        let componentURI = component[0].toString_();
                        let orientation = component[1];
                        let URI = componentURI.replace(/https:\/\/synbiohub.org\/public\/igem\//g, "");

                        if (exists(docComponents, URI)) {

                            let componentPosition = docComponents.findIndex(row => row.includes(URI));
                            let componentFound = docComponents[componentPosition][0];
                            components.push([componentFound, orientation]);

                        }

                    });
                    componentURIs.push(components);
                });
                return componentURIs;
            }


            function getDisplayComponents(doc, displayComponents) {
                let components = [];

                displayComponents.forEach((componentSequence)=>{
                    let tempComponent = [];
                    componentSequence.forEach((component)=>{
                        let componentData = component[0];
                        let orientation = component[1];
                        let displayId = componentData.getDisplayId_();
                        let types = componentData.getTypes_();
                        let topologies = [];
                        let isDNA = "";
                    });
                });
                for (let i in displayComponents) {
                    let component = [];
                    for (let j = 0; j < displayComponents[i].length; j++) {

                        let componentData = displayComponents[i][j][0];
                        let orientation = displayComponents[i][j][1];
                        let displayId = componentData.getDisplayId_();
                        let types = componentData.getTypes_();
                        let topologies = [];
                        let isDNA = "";

                        if (types) {

                            for (let y = 0; y < types.size_(); y++) {

                                let formatType = types.get_(y).toString_().replace(/https:\/\/identifiers.org\//g, "");
                                let sbo = (formatType).match(/SBO.([0-9]+)/g);
                                if (!sbo || !sbo.length) return
                                let type = componentType(sbo);
                                isDNA = type;
                                if (type) {
                                    if (isDNA === "DNA") {
                                        topologies.push(type);
                                    }
                                }
                            }
                        }

                        if (isDNA === "DNA") { //TODO if range not set for component then use this otherwise go to default return

                            let glyph = 'unspecified';
                            displayId = componentData.getName_() === null ? componentData.getDisplayId_() : componentData.getName_();
                            let roles = componentData.getRoles_();

                            let details = 'Component: \n';
                            if (displayId) details += 'Name:' + displayId + '\n';
                            componentData.getDescription_() ? details += 'Description:' + componentData.getDescription_() + '\n' : "";
                            if (roles) {
                                for (let i = 0; i < roles.size_(); i++) {
                                    let role = roles.get_(i).toString_();
                                    let formatRole = role.replace(/https:\/\/identifiers.org\//g, "");
                                    let so = (formatRole).match(/SO.([0-9]+)/g);
                                    if (!so || !so.length) return
                                    let roleGlyph = getRoles(so);

                                    if (isDNA === "DNA") {
                                        roleGlyph ? glyph = roleGlyph : glyph = 'unspecified';
                                    }
                                }
                            }

                            component.push({
                                name: displayId,
                                idURI: "https://synbiohub.org/public/igem/" + componentData.getDisplayId_(),
                                items: [{
                                    orientation: orientation,
                                    type: glyph,
                                    id: componentData.getDisplayId_(),
                                    name: displayId,
                                    tooltip: details,
                                    isComposite: false

                                }],
                                topologies: topologies
                            });
                        }
                    }
                    components.push(component);

                }
                /*
                                  return {
                                      idName: displayId,
                                      idURI: componentData.getURI_().toString(),
                                      items: () => {
                                          let glyph = 'unspecified';

                                           let displayId = componentData.getName_() === '' ? componentData.getDisplayId_() : componentData.getName_();
                                      },
                                      topologies: topologies

                                  }
              */
                return components
            }
        } catch (e) {
            console.log(e);
        }
    }

};
