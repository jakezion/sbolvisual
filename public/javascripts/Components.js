module.exports = class Component {


    constructor(component) {

        this.component = component;

        this.types = this.component.getTypes_();
        this.roles = this.component.getRoles_();
        this.subcomponents = [];

    }

    /*
    find way to update subcomponents on creation, self initialising
     */
    setSubComponents() { //TODO maybe make each subcomponent own array in this.subcomponents
        let subcomponents = [];
        this.component.getSubComponents_() ? this.component.getSubComponents_().toArray_().forEach((subcomponent) => {
            subcomponents.push(subcomponent);
        }) : null;

        return subcomponents.length !== 0 ? subcomponents.forEach((subcomponent) => {
            this.subcomponents.push(subcomponent);
        }) : null;
    }

    getSubComponents() {
        this.setSubComponents();
        return this.subcomponents;
    }

    setSequence() {
       // console.log("sequences", this.component.getSequences_());
        return this.component.getSequences_() ? this.component.getSequences_() : null;
    }


    //get roles based on SO URI
    getSoRoles(so) {
        let search = so.toString().replace("SO:", "");
        if (search === "0000167") {
            return "Promoter";
        } else if (search === "0000139") {
            return "RBS";
        } else if (search === "0000316") {
            return "CDS";
        } else if (search === "0000141") {
            return "Terminator";
        } else if (search === "0000057") {
            return "Operator";
        } else if (search === "0000234") {
            return "mRNA";
        } else if (search === "0000289") {
            return "FunctionalCompartment";
        } else if (search === "0000290") {
            return "PhysicalCompartment";
        } else if (search === "0000704") {
            return "Gene";
        } else if (search === "0000804") {
            return "EngineeredRegion";
        } else {
            return "undefined";
        }
    }

    //get roles based on GO URI
    getGoRoles(go) {
        let search = go.toString().replace("GO:", "");
        if (search === "0003700") {
            return "TF";
        } else if (search === "0003674") {
            return "MolecularFunction";
        } else {
            return "undefined";
        }
    }

    //get roles based on CHEBI URI
    getChebiRoles(chebi) {
        let search = chebi.toString().replace("CHEBI:", "");
        if (search === "35224") {
            return "Effector";
        } else {
            return "undefined";
        }
    }

    //get roles based on SBO URI
    componentType(sbo) {
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

    setDisplayID() {
        return this.component.getDisplayId_() ? this.component.getDisplayId_() : this.component.getName_();
    }


    setName() {
        return this.component.getName_() ? this.component.getName_() : this.component.getDisplayId_();
    }


    setDescription() {
        return this.component.getDescription_() ? this.component.getDescription_() : null;
    }

    setType() {
        let sboType = null;
        this.types.toArray_().forEach((type) => {
            if (type) {
                let format = type.toString_().replace(/https:\/\/identifiers.org\//g, "");
                let sbo = (format).match(/SBO.([0-9]+)/g);
                sboType = sbo ? this.componentType(sbo) : null;
            }
        });
        return sboType;
    }

    setGlyph() {
        let glyph = "unspecified";
        this.roles.toArray_().forEach((role) => {
            if (role) {
                let format = role.toString_().replace(/https:\/\/identifiers.org\//g, "");
                if ((format).match(/SO.([0-9]+)/g)) {
                    glyph = this.getSoRoles(format) ? this.getSoRoles(format) : "unspecified";
                } else if ((format).match(/GO.([0-9]+)/g)) {
                    glyph = this.getGoRoles(format) ? this.getGoRoles(format) : "unspecified";
                } else if ((format).match(/CHEBI.([0-9]+)/g)) {
                    glyph = this.getChebiRoles(format) ? this.getChebiRoles(format) : "unspecified";
                }
            }
        });
        return glyph;
    }

    setRole() { //TODO checker
        let role = null;
        this.roles.toArray_().forEach((identifier) => {
            if (identifier) role = identifier.toString_().replace(/https:\/\/identifiers.org\//g, "");
        });
        return role;
    }


    components() {
        return {
            name: this.setName(),
            displayID: this.setDisplayID(),
            description: this.setDescription(),
            type: this.setType(),
            role: this.setRole(),
            glyph: this.setGlyph(),
            orientation: "inline",
            sequence: this.setSequence(),
            subcomponents: this.getSubComponents()
        };
    }
}
