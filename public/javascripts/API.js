//const index = require("./routes/index");

const fs = require('fs');
const java = require('java');
const mvn = require('node-java-maven');
//const Util = require('util');
//const EventEmitter = require('events').EventEmitter;
//const ChildProc = require('child_process');
//console.log(typeof index); // => 'function'
//let context;

java.classpath.push("./public/libSBOLj3.jar");

mvn(function (err, mvnResults) {
    if (err) {
        return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function (c) {
        // console.log('adding ' + c + ' to classpath');
        //console.log("\n");
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

    setDocument: (context, graph, data) => {

        function getRoles(so) {
            let search = so.toString().replace("SO:", "");
            // let search2 = XO.replace("GO:", "");
            // console.log(search);
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
            //console.log(search);
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

        function interactionType(sbo) {
            // console.log(sbo);
            let search = sbo.toString().replace("SBO:", "");
            //  console.log(search);
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

        // console.log(java.isJvmCreated());
        //console.log(context);
        let json = JSON.stringify(data);


        let SBOLDocument = java.import("org.sbolstandard.entity.SBOLDocument");
        let ComponentType = java.import("org.sbolstandard.vocabulary.ComponentType");
        let Role = java.import("org.sbolstandard.vocabulary.Role");
        let Arrays = java.import("java.util.Arrays");
        let List = java.import("java.util.ArrayList")
        //let SBOLIO = java.newInstanceSync("org.sbolstandard.io.SBOLIO");
        let SBOLIO = java.import("org.sbolstandard.io.SBOLIO");
        let File = java.import("java.io.File");
        let SBOLAPI = java.import("org.sbolstandard.api.SBOLAPI");
        let identified = java.import("org.sbolstandard.entity.Identified");
        let component = java.import("org.sbolstandard.entity.Component");
        let URI = java.import("java.net.URI");
        //let testUtil = java.import("org.sbolstandard.TestUtil");
        //TODO
        let RDFUtil = java.import("org.sbolstandard.util.RDFUtil");
        let DataModelSubComponent = java.import("org.sbolstandard.vocabulary.DataModel$SubComponent");
        let DataModelCut = java.import("org.sbolstandard.vocabulary.DataModel$Cut");
        let LocationFactory = java.import("org.sbolstandard.entity.Location$LocationFactory");
        //let LocationFactory = java.import("org.sbolstandard.entity.Location");
        let URINameSpace = java.import("org.sbolstandard.util.URINameSpace");
        let Location = java.import("org.sbolstandard.entity.Location");
        let CutLocation = java.import("org.sbolstandard.entity.CutLocation");
        //TODO

        try {
            let rdfUtil = new RDFUtil();
            let locationFactory = new LocationFactory();
            let ArrayList = new List();
            let uri = new URI("");
            let API = new SBOLAPI();
            let io = new SBOLIO();
            let base = URI.create_("https://synbiohub.org/public/igem/");
            //let base = URI.create_(""); //REMOVE BASE URI AND SEND A FILE INSTEAD FOR DOCUMENT IN SBOLIO

            fs.writeFileSync("./public/javascripts/LD.jsonld", "");
            fs.writeFileSync("./public/javascripts/LD.jsonld", json);

            let fileWrite = new File("public/javascripts/write.jsonld");
            let fileRead = new File("public/javascripts/LD.jsonld");

            let ModelFactory = java.import("org.apache.jena.rdf.model.ModelFactory");
            let InputStream = java.import("java.io.FileInputStream");
            let is = new InputStream(fileRead);
            let modelFactory = ModelFactory.createDefaultModel_();
            let model = modelFactory.read_(is, "https://synbiohub.org/public/igem/", "JSON-LD");
            let doc = new SBOLDocument(model);

            return getComponents(doc);

            function sortComponents(components) {
                for (let x = 0; x < doc.getComponents_().size_(); x++) {
                    let found = false;
                    let componentData = doc.getComponents_().get_(x);
                    for (let x in componentData) {

                    }
                }

                components.sort((a, b) => {

                    if (a.ranges.length > 0 && b.ranges.length > 0) {
                        if (start(a) === start(b)) {
                            return end(a) - end(b);
                        } else {
                            return start(a) - start(b);
                        }
                    } else if (a.component && b.component) {
                        return position(components, a.component, {}) - position(components, b.component, {});
                    }
                    return start(a) - start(b);

                });

            }

            function position(components, component, visited) {

                var curPos = 0
                if (visited[component.uri]) return curPos
                components.sequenceConstraints.forEach((sequenceConstraint) => {
                    sequenceConstraint.link()
                    if (sequenceConstraint.restriction.toString() === 'http://sbols.org/v2#precedes') {
                        if (sequenceConstraint.object.uri.toString() === component.uri.toString()) {
                            visited[component.uri] = true
                            var subPos = position(components, sequenceConstraint.subject, visited)
                            if (subPos + 1 > curPos)
                                curPos = subPos + 1
                        }
                    }
                })
                return curPos

            }


            function getComponents(doc) {


                //TODO ORDER BASED ON RANGE FROM SEQUENCE TO GET ORDERING OF COMPONENTS
                //TODO CHECK IF COMPONENT HAS ROLE FIRST BEFORE CHECKING TO SEE IF HAS FEATURES
                /*TODO ranges go up in order just compare them and sort based on order

                 */
                let mainComponents = [];
                let locations = new List();
                let resources = new List();
                let features = new List();
                //let cutLocation;
                //let features = [];
                // let instances;

                for (let x = 0; x < doc.getComponents_().size_(); x++) {
                    let component = doc.getComponents_().get_(x);


                    //TEST TEST TEST TEST TEST TEST TEST TEST TEST


                    //component.getTypes_() ? console.log("types:", component.getTypes_()) : console.log("no types");
                    //component.getRoles_() ? console.log("roles:", component.getRoles_()) : console.log("no roles");

                    //if types and roles then process these instead, otherwise continue as normal


                    //TEST TEST TEST TEST TEST TEST TEST TEST TEST
                    component.getSubComponents_() ? features.add_(component.getSubComponents_()) : "invalid";
                    component.getComponentReferences_() ? features.add_(component.getComponentReferences_()) : "invalid";
                    component.getLocalSubComponents_() ? features.add_(component.getLocalSubComponents_()) : "invalid";
                    component.getExternallyDefineds_() ? features.add_(component.getExternallyDefineds_()) : "invalid";
                    component.getSequenceFeatures_() ? features.add_(component.getSequenceFeatures_()) : "invalid";
                    /*
                                        component.getSubComponents_() ? features.push(component.getSubComponents_()) : "invalid";
                                        component.getComponentReferences_() ? features.push(component.getComponentReferences_()) : "invalid";
                                        component.getLocalSubComponents_() ? features.push(component.getLocalSubComponents_()) : "invalid";
                                        component.getExternallyDefineds_() ? features.push(component.getExternallyDefineds_()) : "invalid";
                                        component.getSequenceFeatures_() ? features.push(component.getSequenceFeatures_()) : "invalid";

                     */
                    //ALSO WORKS component.getSubComponents_() ? console.log("role intergration",component.getSubComponents_()) : "no role intergration";
                }

                //console.log(features.toArray_());


                //  for (let i in features) {
                for (let i = 0; i < features.size_(); i++) {
                    let tempComponents = [];
                    //console.log("feature[i]", features.get_(i).size_());
                    //console.log("feature[i2]", features.get_(i).toArray_());

                    //console.log("temp before",tempComponents);
                    //console.log("features[i]:", features[i]);

                    for (let j = 0; j < features.get_(i).size_(); j++) { //TODO RETURN TO 0 AGAIN j = 0
                        //  for (let j = 0; j < features[i].size_(); j++) {
                        // console.log(j);
                        // let instance = features[i].get_(j);
                        let instance = features.get_(i).get_(j);
                        // console.log("ins", JSON.stringify(instance));


                        /* TODO
                             basically if  hasLocations is set then add all locations to list and return
                             check if subcomponent features are the same, if they have the same range then they are invalid

                                                let locations = instance.getLocations_() ? instance.getLocations_() : null;
                                                 console.log("locations",locations);
                                                 if (locations !== null) {
                                                     let order = locations.getOrder_() ? locations.getOrder_() : null;
                                                     console.log("order", order);
                                                 }
                        */
                        //console.log(instance.toString());
                        // console.log(instance.getLocations_());
                        //console.log("locations",locations);
                        //let location = instance.getLocations_() ? locations.add_(instance.getLocations_()) : null;
                        //console.log("locations",location);
                        //if (location !== null) {
                        //    let order = location.getOrder_() ? location.getOrder_() : null;
                        //   console.log("order", order);
                        //}


                        //console.log("instooons",instance.toString_());
                        //TODO
                        if (locations.isEmpty_()) {
                            // console.log(instance.getUri_().toString_());
                            let resource = doc.getRDFModel_().getResource_(instance.getUri_().toString_()); //TODO Check

                            // console.log("inmodel", resource.inModel_(doc.getRDFModel_()));
                            //let resource = instance.getRDFModel_(); //TODO Check
                            //console.log(instance.toString_());
                            // console.log("resource",resource);
                            //let resources = RDFUtil.getResourcesWithProperty_(resource, DataModelSubComponent.location);
                            //ArrayList<Resource> resources=null;

                            //  console.log("moddel",resource.getModel_().toString_());
                            //  console.log("rosc",resource.toString_());
                            //  console.log("loc", DataModelSubComponent.location.toString_());
                            // let property = doc.getRDFModel_().getResource_(instance.getUri_().toString_()).getModel_().getProperty_(DataModelSubComponent.location.toString_());
                            // Property property=resource.getModel().getProperty(propertyURI.toString());
                            //let resourceModel  = resource.getModel_();
                            let property = resource.getModel_().getProperty_(DataModelSubComponent.location.toString());//TODO CORRECT ONE
                            //  console.log(property.getModel_().toString_());

                            //  console.log("redocordvalue",resource.getPropertyResourceValue_(property));

                            //  console.log("rdsosc",property.getLocalName_());
                            // console.log("rosc",property.inModel_(resource.getModel_()));
                            // StmtIterator it=resource.listProperties(property);
                            //console.log("property checker", resource.hasURI_(property.toString_()).toString_());
                            //console.log("property checker2", property.getId_().toString_());
                            //console.log("property checker2", resource.getRequiredProperty_(property).toString_());
                            //  console.log("list", resource.listProperties_().hasNext_());
                            //  console.log("list", resource.listProperties_().toList_().toString_());

                            //  let it = resource.listProperties_(property); //TODO SOMETHING HERE IS WRONG
                            let it = resource.listProperties_();
                            // console.log("it",it.toList_().size_());
                            // console.log("string",it.toModel_());
                            // console.log("list",it.toList_());
                            // console.log("next",it.hasNext_());
                            //console.log("next stmt",it.nextStatement_());
                            while (it.hasNext_()) {
                                // Statement stmt=it.nextStatement();
                                let stmt = it.nextStatement_();
                                // RDFNode object=stmt.getObject();
                                //console.log("subject", stmt.getSubject_().toString_());
                                //console.log("predicate", stmt.getPredicate_().toString_());
                                if (stmt.getPredicate_().toString_() === "http://sbols.org/v3#hasLocation") { //TODO UPDATE TO GET THE ORIENTATION TYPE AS WELL
                                    let object = stmt.getObject_();

                                    //console.log("object",object.toString_());
                                    if (object.isResource_()) {

                                        // if (resources==null)
                                        // {
                                        //     instances=new ArrayList<Resource>();
                                        // }

                                        resources.add_(object.asResource_());

                                    } else {
                                        // String message=String.format("The property %s has literal value!", propertyURI.toString());
                                        console.log("error");
                                        //  throw new SBOLGraphException(message);
                                    }
                                }
                            }
                            //return resources;

                            if (resources !== null) {
                                // console.log("resources", resources.toString_());
                                //console.log("resources",resources);
                                for (let i = 0; i < resources.size_(); i++) {
                                    console.log("resource get", resources.get_(i).toString_());

                                    let locat = new Location(resources.get_(i));

                                    //let locationRes = LocationFactory.create_(resources.get_(i)); // ||TODO GET NODE-JAVA EMBEDDED CLASS CODE

                                    //if (RDFUtil.hasType_(resource.getModel_(), resource, DataModelCut.uri)) {
                                    //   let cutLocation = new CutLocation(resource);
                                    //}
                                    //else {
                                    //null;
                                    //}
console.log("locat",locat);

                                    //  console.log("locationRes", CutLocation);
                                    //  locations.add_(CutLocation);
                                }
                            }
                        }
                        console.log("locations", locations);


                        let instanceOf = instance.getIsInstanceOf_() ? instance.getIsInstanceOf_() : "invalid";
                        let orientation = instance.getOrientation_() ? instance.getOrientation_().toString_() : null;

                        tempComponents.push([instanceOf, orientation]);

                    }
                    console.log("\n");
                    // console.log(tempComponents);
                    mainComponents.push(tempComponents);
                }
                //console.log("main",mainComponents);
                let allComponents = uriToComponents(doc, mainComponents);
                //console.log("all comps",allComponents);

                return getDisplayComponents(doc, allComponents);
                // mainComponents.push(features);
                //console.log("Main comp", mainComponents);

            }

            function exists(arr, search) {
                return arr.some(row => row.includes(search));
            }

            function uriToComponents(doc, componentURI) {
                let allComponents = [];
                let search = [];

                for (let j = 0; j < doc.getComponents_().size_(); j++) {
                    let instanceComponent = doc.getComponents_().get_(j);
                    let instance = doc.getComponents_().get_(j).getDisplayId_();
                    search.push([instanceComponent, instance]);
                }

                for (let i in componentURI) {
                    // console.log("[i]",componentURI[i]);
                    let components = [];
                    for (let j in componentURI[i]) {
                        // console.log("[j]",componentURI[i][j]);
                        let searchURI = componentURI[i][j][0].toString_();
                        let orientation = componentURI[i][j][1];
                        let componentQuery = searchURI.replace(/https:\/\/synbiohub.org\/public\/igem\//g, "");
                        //console.log("component id", search);

                        // console.log(components);
                        // get individual ids
                        // console.log("search",search);
                        //console.log("component uri", componentQuery); //ARRAY SEARCH URI BASED ON IDS

                        if (exists(search, componentQuery)) {
                            // if (search[j][1].includes(componentQuery)) {
                            //console.log("Match");
                            let componentPosition = search.findIndex(row => row.includes(componentQuery));
                            //console.log("position",componentPosition);
                            //let componentPosition = search[j][search.indexOf(componentQuery)];
                            //console.log("position", componentPosition);
                            // console.log(orientation);
                            let componentFound = search[componentPosition][0];
                            //console.log(componentFound);
                            components.push([componentFound, orientation]);

                        }
                        // console.log("components",components);
                        //console.log("uri",componentURI);
                        //console.log("clipped",componentQuery);
                    }
                    allComponents.push(components);
                }
                // console.log("all components",allComponents);
                return allComponents;
            }


            function getDisplayComponents(doc, displayComponents) {
                let components = [];

                // console.log("display comps",displayComponents);
                for (let i in displayComponents) {
                    let component = [];
                    // console.log("display comps i",displayComponents[i]);
                    // console.log("display comps just i",i);
                    for (let j = 0; j < displayComponents[i].length; j++) {
                        //console.log(displayComponents[i]);
                        // for (let j in displayComponents[i]) {
                        let componentData = displayComponents[i][j][0];
                        let orientation = displayComponents[i][j][1];

                        // console.log(orientation);
                        // sortComponents();
                        let displayId = componentData.getDisplayId_();
                        let types = componentData.getTypes_();
                        let topologies = [];

                        //DNA Checker
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
                        //console.log("\n");
                        //console.log(isDNA);
                        // console.log("^");

                        if (isDNA === "DNA") { //TODO if range not set for component then use this otherwise go to default return
                            // console.log("reached DNA");
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
                                    //console.log(roleGlyph);

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
                    // console.log("component", component);
                    components.push(component);

                }
                //TODO NOT CORRECT FORMAT return components;
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

        } catch
            (e) {
            console.log(e);
        }
    }
};
