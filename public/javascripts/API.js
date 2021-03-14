/*TODO
   Check:
        PopsReceiver => Works
        Combine 2020 => Works
        Annotation =>
        Attachment =>
        Collection =>
        Component Urn Uri =>
        Implementation =>
        Interface =>
        Model =>
        Measurement =>
        Measurement Using Units From OM =>
        Multicellular =>
        Multicellular Simple =>
        Activity =>
        Agent =>
        Plan =>
        Toggle Switch =>
 */

module.exports = {

    setDocument: (data) => {

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
        //setting sync method suffix to _ to avoid Sync issues
        java.asyncOptions = {
            asyncSuffix: undefined,     // Don't generate node-style methods taking callbacks
            syncSuffix: "_",              // Sync methods use the base name(!!)
            promiseSuffix: "Promise",   // Generate methods returning promises, using the suffix Promise.
            promisify: require('util').promisify // Needs Node.js version 8 or greater, see comment below
        };

        try {

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

            //create SBOL document with a model based on the https://synbiohub.org/public/igem/ URI
            let modelFactory = ModelFactory.createDefaultModel_();
            let model = modelFactory.read_(is, "https://synbiohub.org/public/igem/", "JSON-LD");
            let doc = new SBOLDocument(model);

            //return components and their objects to be sent to middleware
            return getComponents(doc);


            //get roles based on SO URI
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

            //get roles based on SBO URI
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


            //sorts the subcomponents based on the start number of their ranges
            function sortComponents(components) {
                /*sorted.forEach((subcomponent) => {
                    delete subcomponent.startNum;
                    delete subcomponent.endNum;
                });*/
                return components.sort((a, b) => (a.startNum > b.startNum) ? 1 : -1);
            }


            /*
                get components after getting their respective subcomponents,
                finding the ranges and sorting them,
                then getting the correct uri and its data,
                which is sent to the displayComponents function
                 where an object with all details needed for a component is stored

             */
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
                    let group = [];
                    component.getSubComponents_() ? features.push(component.getSubComponents_()) : "invalid";
                    //component.getComponentReferences_() ? group.push(component.getComponentReferences_()) : "invalid";
                    //component.getLocalSubComponents_() ? group.push(component.getLocalSubComponents_()) : "invalid";
                    //component.getExternallyDefineds_() ? group.push(component.getExternallyDefineds_()) : "invalid";
                    // component.getSequenceFeatures_() ? group.push(component.getSequenceFeatures_()) : "invalid";
                    // console.log(group);
                    //if(group.length !== 0) {
                    //   features.push(group);
                    //}
                });
                // features.forEach((subcomponents) => {
                //     console.log("features", subcomponents);
                //     subcomponents.forEach((test)=>{
                //        console.log("test",test.toArray_());
                //     });
                // });

                features.forEach((subcomponents) => {//1
                    let tempComponents = [];
                    let tempLocations = [];
                    let orderedLocations = [];
                    // console.log("sub", subcomponents);
                    subcomponents.toArray_().forEach((instance) => {//2
                        console.log("instance", instance);

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

            //check if uri exists in document
            function exists(arr, search) {
                return arr.some(row => row.includes(search));
            }

            //gets the uri associated with a component and its orientation
            function getComponentURI(doc, componentData) {
                let componentURIs = [];
                // let search = [];
                let docComponents = [];
                //console.log("componentURI", componentData);
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
                        let formatURI = componentURI.replace(/https:\/\/synbiohub.org\/public\/igem\//g, "");

                        if (exists(docComponents, formatURI)) {

                            let componentPosition = docComponents.findIndex(row => row.includes(formatURI));
                            let componentFound = docComponents[componentPosition][0];
                            components.push([componentFound, orientation]);

                        }

                    });
                    componentURIs.push(components);
                });
                return componentURIs;
            }

            //get the type of the component
            function getToTypes(types) {
                let type = null;
                if (types) {
                    types.toArray_().forEach((identifier) => {
                        let formatType = identifier.toString_().replace(/https:\/\/identifiers.org\//g, "");
                        let sbo = (formatType).match(/SBO.([0-9]+)/g);
                        sbo ? type = componentType(sbo) : type = null;
                    });
                }
                return type;
            }

            //gets the role of the component
            function getToRoles(roles) {
                let role = "unspecified";
                if (roles) {
                    roles.toArray_().forEach((identifier) => {
                        let formatRole = identifier.toString_().replace(/https:\/\/identifiers.org\//g, "");
                        let so = (formatRole).match(/SO.([0-9]+)/g);
                        so ? role = getRoles(so) : role = "unspecified";
                    });
                }
                return role;
            }


            //builds the object that contains the data related to the components to be displayed
            function getDisplayComponents(doc, displayComponents) {
                let components = [];
                displayComponents.forEach((componentSequence) => {
                    let tempComponent = [];
                    componentSequence.forEach((component) => {

                        let orientation = component[1];
                        let displayId = component[0].getDisplayId_() ? component[0].getDisplayId_() : component[0].getName_();
                        let name = component[0].getName_() ? component[0].getName_() : component[0].getDisplayId_();
                        let types = component[0].getTypes_();
                        let details = 'Component:\n ';
                        if (displayId) details += displayId + '\n';
                        component[0].getDescription_() ? details += 'Description:\n' + component[0].getDescription_() + '\n' : "";
                        let dnaType = [];
                        //let isDNA = "";
                        //console.log("types", types);
                        //console.log("types", types);
                        let type = getToTypes(types);
                        //console.log("type", type);
                        dnaType.push(type);
                        if (type === "DNA") { //TODO Checker
                            //let glyph = 'unspecified';
                            let roles = component[0].getRoles_();
                            let roleIdentifier = "undefined";
                            if (roles) {
                                roles.toArray_().forEach((identifier) => {
                                    roleIdentifier = identifier.toString_().replace(/https:\/\/identifiers.org\//g, "");
                                });
                            }
                            let role = getToRoles(roles);
                            //console.log("roles", role);

                            let b = false;
                            if (b === true) {
                                //TODO               if(start and end range, or sequence ) add sequence and start and end range else
                                // tempComponent.push({
                                //     name: displayId,
                                //     idURI: "https://synbiohub.org/public/igem/" + displayId,
                                //     items: [{
                                //         id: displayId,
                                //         name: name,
                                //         description: details,
                                //         type: type,
                                //         orientation: "inline"
                                //          start: start,
                                //          end: end,
                                //          sequence: sequence
                                //     }],
                                //     dna: dnaType
                                // });
                            } else {

                                tempComponent.push({
                                    name: displayId,
                                    idURI: "https://synbiohub.org/public/igem/" + displayId,
                                    items: [{
                                        id: displayId,
                                        name: name,
                                        description: details,
                                        type: role,
                                        so: roleIdentifier,
                                        orientation: orientation

                                    }],
                                    dna: dnaType
                                });
                            }
                        } else {
                            //TODO add role for nonDNA types
                            tempComponent.push({
                                name: displayId,
                                idURI: "https://synbiohub.org/public/igem/" + displayId,
                                items: [{
                                    id: displayId,
                                    name: name,
                                    description: details,
                                    type: type,
                                    orientation: "inline"
                                }],
                                dna: dnaType
                            });
                        }
                    });
                    components.push(tempComponent);
                    console.log("components", components);
                });
                return components;
            }

        } catch (e) {
            console.log(e);
        }
    }
};
