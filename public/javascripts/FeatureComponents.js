//const Component = require('./Components.js');

module.exports = class FeatureComponent {
    /*
    do for each of each subcomponent on current component and order them here
     */

    constructor(component, doc, uri, range) {
        this.component = component;
        this.doc = doc;
        this.uri = uri;
        this.range = range;

    }

    setInstanceOf() {
        return this.component.getIsInstanceOf_() ? this.component.getIsInstanceOf_().toString_().replace(/https:\/\/synbiohub.org\/public\/igem\//g, "") : "unspecified";
    }

    setStart(start) {
        return this.start = start;
    }

    getStart() {
        return this.start;
    }


    setEnd(end) {
        return this.end = end;
    }

    getEnd() {
        return this.end;
    }




    setOrientation() {
        // this.subcomponent.forEach()
        let resource = this.doc.getRDFModel_().getResource_(this.component.getUri_().toString_());
        let it = resource.listProperties_(); //Todo Lift properties if URI === hasLocation
        let resources = [];
        if (it !== null) {
            while (it.hasNext_()) {

                let stmt = it.nextStatement_();
                //console.log("stmt predicate",stmt.getPredicate_().toString_());
                // console.log("stmt object",stmt.getObject_().toString_());
                if (stmt.getPredicate_().toString_() === "http://sbols.org/v3#hasLocation") {

                    let object = stmt.getObject_();
                    if (object.isResource_()) {

                        resources.push(object.asResource_());
                    } else {

                        console.log("error");
                    }
                }
            }
            //console.log("resources", resources);
            // console.log("length",resources.length);
            if (resources.length !== 0) {
                let getUri = this.uri.resolve_(resources[0].getURI_());
                let range = this.doc.getIdentified_(getUri, this.range.class);
                let start = range.getStart_() ? range.getStart_() : null;
                let end = range.getEnd_() ? range.getEnd_() : null;
                let orientation = this.component.getOrientation_() ? this.component.getOrientation_().toString_() : "inline";
                // let instanceOf = this.component.getIsInstanceOf_() ? this.component.getIsInstanceOf_() : "invalid";
                this.setStart(start);
                this.setEnd(end);

                return orientation;
            }
        }
        return "inline";
    }


    components() {

        return {
            instance: this.setInstanceOf(),
            orientation: this.setOrientation(),
            start: this.getStart(),
            end: this.getEnd(),
        };
    }
}
