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
const mvn = require('node-java-maven');
const Component = require('./Components.js');
const FeatureComponent = require('./FeatureComponents.js');

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

module.exports = {

    setDocument: (data, format) => {

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

            //create SBOL document with a model based on the https://synbiohub.org/public/igem/ URI
            let modelFactory = ModelFactory.createDefaultModel_();
            let model = modelFactory.read_(is, "https://synbiohub.org/public/igem/", format);
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
                } else if (search === "0000804") {
                    return "EngineeredRegion";
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

            //sorts the subcomponents based on the start number of their ranges
            // function sortComponents(components) {
            //     /*
            //     sorted.forEach((subcomponent) => {
            //         delete subcomponent.startNum;
            //         delete subcomponent.endNum;
            //     });
            //     */
            //     return components.sort((a, b) => (a.startNum > b.startNum) ? 1 : -1);
            // }

            function sortComponents(components) {
                return components.sort((a, b) => (a.start > b.start) ? 1 : -1);
            }

            /*
                get components after getting their respective subcomponents,
                finding the ranges and sorting them,
                then getting the correct uri and its data,
                which is sent to the displayComponents function
                 where an object with all details needed for a component is stored

             */

            function getDocComponents(doc) {
                let docComponents = [];
                for (let x = 0; x < doc.getComponents_().size_(); x++) {
                    let component = doc.getComponents_().get_(x);
                    docComponents.push(component);
                }
                return docComponents;
            }

            // function filterObject(object) {
            //     return object.filter(a=> a.subcomponent.length !== 0);
            // }


            function getComponents(doc) {

                let map = new Map();
                let map2 = new Map();
                let testObjectComponents = [];
                for (let x = 0; x < doc.getComponents_().size_(); x++) {
                    let component = doc.getComponents_().get_(x);
                    let componentTest = new Component(component);
                    testObjectComponents.push(componentTest.components());
                }

                testObjectComponents.filter(x => x.subcomponents.length !== 0).forEach((component) => {
                    let subcomponentObject = [];

                    component.subcomponents.forEach((subcomponent) => {

                        let componentFeatureTest = new FeatureComponent(subcomponent, doc, uri, Range);
                        let components = componentFeatureTest.components();

                        if (components.start && components.end !== undefined) {
                            subcomponentObject.push(components);
                        }
                    });
                    sortComponents(subcomponentObject);
                    component.subcomponents.length = 0;
                    component.subcomponents = subcomponentObject.slice(0);

                    map.set(component.displayID,component);
                });

                testObjectComponents.forEach((component)=>{
                    map2.set(component.displayID,component);
                });



                console.log("map",map);
                console.log("map",map2);
//TODO get each subcomponent, add to array run through class, sort for order then return and replace old subcomponents


                let mainComponents = [];
                let locations = [];
                let sortedLocations;
                let features = [];
                let allComponents;

                let docComponents = getDocComponents(doc);

                //TODO if has constraints check for object and subject and check
                docComponents.forEach((component) => {

                    //TODO add overrideRoles capability
                    component.getSubComponents_() ? features.push(component.getSubComponents_()) : null;

                });


                if (features.length !== 0) {

                    features.forEach((subcomponents) => {
                        let tempComponents = [];
                        let tempLocations = [];
                        let orderedLocations = [];

                        subcomponents.toArray_().forEach((instance) => {

                            let resource = doc.getRDFModel_().getResource_(instance.getUri_().toString_());
                            let it = resource.listProperties_(); //Todo Lift properties if URI === hasLocation
                            let resources = [];
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
                                } else {
                                    let instanceOf = instance.getIsInstanceOf_() ? instance.getIsInstanceOf_() : "invalid";
                                    let orientation = instance.getOrientation_() ? instance.getOrientation_().toString_() : "inline";
                                    let format = {

                                        subcomponent: instanceOf,
                                        orientation: orientation,

                                    };
                                    tempComponents.push(format);


                                }
                            } else {
                                console.log("Error");
                            }
                        });
                        if (tempLocations.length !== 0) {
                            sortedLocations = sortComponents(tempLocations);
                            sortedLocations.forEach((ins) => {
                                if (ins !== null) {
                                    let format = {
                                        subcomponent: ins.subcomponent,
                                        orientation: ins.orientation
                                    }
                                    orderedLocations.push(format);
                                }
                            });

                            if (orderedLocations.length !== 0) {

                                locations.push(orderedLocations);
                            }
                        } else {
                            mainComponents.push(tempComponents);
                        }
                    });
                } else {
                    let allComponents = [];
                    docComponents.forEach((component) => {
                        let format = {
                            component: component,
                            orientation: "inline"
                        }
                        allComponents.push(format);

                    });
                    return getDisplayComponents(doc, allComponents);


                }

                if (locations.length !== 0) {
                    allComponents = getComponentURI(doc, locations);
                } else {
                    allComponents = getComponentURI(doc, mainComponents);
                }

                return getDisplayComponents(doc, allComponents);
            }


            //gets the uri associated with a component and its orientation
            function getComponentURI(doc, componentData) {
                let componentURIs = [];
                // let search = [];
                let docComponents = [];

                for (let i = 0; i < doc.getComponents_().size_(); i++) {
                    let instanceComponent = doc.getComponents_().get_(i);
                    let instance = doc.getComponents_().get_(i).getDisplayId_();
                    let format = {

                        component: instanceComponent,
                        instanceID: instance

                    };
                    docComponents.push(format);

                }

                componentData.forEach((componentSequence) => {
                    let components = [];
                    componentSequence.forEach((component) => {
                        let componentURI = component.subcomponent.toString_();
                        let orientation = component.orientation;
                        let formatURI = componentURI.replace(/https:\/\/synbiohub.org\/public\/igem\//g, "");
                        let componentPosition = docComponents.map((x) => {
                            return x.instanceID;
                        }).indexOf(formatURI);

                        if (componentPosition !== -1 || componentPosition !== undefined) {
                            let componentFound = docComponents[componentPosition].component;
                            let format = {
                                component: componentFound,
                                orientation: orientation
                            }
                            components.push(format);
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

            //gets the sequence and its range for a component
            /*
            function getSequence(doc, component) {
                let elements = null;
                let sequence = doc.getIdentified_(component.component.getUri_(), Sequence.class);
                let resource = doc.getRDFModel_().getResource_(sequence.getUri_().toString_());
                let it = resource.listProperties_(); //Todo Lift properties if URI === hasLocation
                if (it !== null) {
                    while (it.hasNext_()) {
                        let stmt = it.nextStatement_();
                        if (stmt.getPredicate_().toString_() === "http://sbols.org/v3#elements") {
                            let object = stmt.getObject_();
                            if (object.isResource_()) {
                                elements = object.asResource_();
                            } else {
                                console.log("error");
                            }
                        }
                    }
                    return elements;
                }
            }
            */

            function getToRoleIdentifier(roles) {
                let role = "undefined";
                if (roles) {
                    roles.toArray_().forEach((identifier) => {
                        role = identifier.toString_().replace(/https:\/\/identifiers.org\//g, "");
                    });
                }
                return role;
            }

            function getMultiObject(componentSequence) {
                let tempComponent = [];
                componentSequence.forEach((component) => {
                    let properties = setProperties(component);
                    let dnaType = [];

                    //let sequence = getSequence(doc, component);

                    let type = getToTypes(properties.types);

                    dnaType.push(type);
                    if (type === "DNA") { //TODO Checker

                        let roles = component.component.getRoles_();
                        let roleIdentifier = getToRoleIdentifier(roles);

                        let role = getToRoles(roles);

                        let object = {
                            name: properties.displayId,
                            idURI: "https://synbiohub.org/public/igem/" + properties.displayId,
                            items: [{
                                id: properties.displayId,
                                name: properties.name,
                                description: properties.details,
                                type: role,
                                so: roleIdentifier,
                                orientation: properties.orientation,
                            }],
                            dna: dnaType
                        };
                        let sequence = false;
                        if (sequence === true) {
                            object.items["sequence"] = sequence;
                            tempComponent.push(object);
                        } else {
                            tempComponent.push(object);
                        }
                    } else {
                        //TODO add role for nonDNA types
                        tempComponent.push({
                            name: properties.displayId,
                            idURI: "https://synbiohub.org/public/igem/" + properties.displayId,
                            items: [{
                                id: properties.displayId,
                                name: properties.name,
                                description: properties.details,
                                type: type,
                                orientation: "inline"
                            }],
                            dna: dnaType
                        });
                    }
                });
                return tempComponent;
            }


            function setProperties(component) {
                let properties = {};
                properties["orientation"] = component.orientation;
                properties["displayId"] = component.component.getDisplayId_() ? component.component.getDisplayId_() : component.component.getName_();
                properties["name"] = component.component.getName_() ? component.component.getName_() : component.component.getDisplayId_();
                properties["types"] = component.component.getTypes_();
                properties["details"] = component.component.getDescription_() ? component.component.getDescription_() : ""; //'Component:\n ';
                //  if (displayId) details += displayId + '\n';
                // component.component.getDescription_() ? details += 'Description:\n' + component.component.getDescription_() + '\n' : "";
                // properties["dnaType"] = [];
                // let type = getToTypes(properties.types);
                // properties.dnaType.push(type);

                return properties;
            }

            function getSingleObject(component) {
                let tempComponent = [];
                let properties = setProperties(component);
                let dnaType = [];
                let type = getToTypes(properties.types);
                dnaType.push(type);

                if (type === "DNA") { //TODO Checker

                    let roles = component.component.getRoles_();
                    let roleIdentifier = getToRoleIdentifier(roles);
                    let role = getToRoles(roles);

                    tempComponent.push({
                        name: properties.displayId,
                        idURI: "https://synbiohub.org/public/igem/" + properties.displayId,
                        items: [{
                            id: properties.displayId,
                            name: properties.name,
                            description: properties.details,
                            type: role,
                            so: roleIdentifier,
                            orientation: properties.orientation

                        }],
                        dna: dnaType
                    });

                } else {
                    //TODO add role for nonDNA types
                    tempComponent.push({
                        name: properties.displayId,
                        idURI: "https://synbiohub.org/public/igem/" + properties.displayId,
                        items: [{
                            id: properties.displayId,
                            name: properties.name,
                            description: properties.details,
                            type: type,
                            orientation: "inline"
                        }],
                        dna: dnaType
                    });
                }
                return tempComponent;
            }

            //builds the object that contains the data related to the components to be displayed
            function getDisplayComponents(doc, displayComponents) {
                let components = [];
                // console.log("display Components", displayComponents);
                displayComponents.forEach((componentSequence) => {
                    let tempComponent;
                    // console.log("component Sequence", componentSequence);
                    if (componentSequence.length > 1) {
                        tempComponent = getMultiObject(componentSequence);
                    } else {
                        tempComponent = getSingleObject(componentSequence);
                    }
                    components.push(tempComponent);
                });
                return components;
            }


        } catch
            (e) {
            console.log(e);
        }
    }
};
