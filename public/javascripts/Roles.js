const setup = require('Imports');
setup.setup();
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