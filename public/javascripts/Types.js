const setup = require('Imports');
setup.setup();
module.exports = {
//get roles based on SBO URI
    componentType: (sbo) => {
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
    },

//get the type of the component
    getToTypes: (types) => {
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

}