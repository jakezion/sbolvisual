
//TODO IF GLYPH DNA TYPE !== DNA THEN DONT GET GLYPH
function setGlyphs(components) {
    let glyphs = [];
    components.forEach((component) => {

        let glyph = [];
        component.forEach((itemValue) => {
            //update for multiple types
            if (itemValue.dna.includes("DNA")) {
                itemValue.items.forEach((item) => {

                    let details = {

                        type: item.type,
                        orientation: item.orientation,
                        name: item.id

                    };
                    glyph.push(details);
                });
            }
        });
        glyphs.push(glyph);
    });

    getGlyph(glyphs);

}


function getJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        throw new Error(e);
    }
}

function getGlyph(glyph) {
    if (glyph) {
        let URI = [];

        glyph.forEach((type) => {
            let tempURI = [];

            type.forEach((value) => {
                let getGlyph = value.type.toLowerCase();
                let getOrientation = value.orientation.toLowerCase();
                let typeValue = "";
                let orientationValue = "";
                switch (getGlyph) {
                    case "cds":
                        typeValue = "cds";
                        break;
                    case "promoter":
                        typeValue = "promoter";
                        break;
                    case "terminator":
                        typeValue = "terminator";
                        break;
                    case "rbs":
                        typeValue = "ribosome-entry-site";
                        break;
                    case "unspecified":
                        typeValue = "user-defined";
                        break;
                    case "gene":
                        typeValue = "user-defined";
                        break;
                    case "operator":
                        typeValue = "operator";
                        break;
                    case "engineered region": //TODO check
                        typeValue = "user-defined";
                        break;
                    default:
                        typeValue = "user-defined";
                }
                switch (getOrientation) {
                    case "inline":
                        orientationValue = " ";
                        break;
                    case "reverseComplement":
                        orientationValue = " antisense ";
                        break;
                    default:
                        console.error("not found");
                        break;
                }
                let structure = "sbolv" + orientationValue + typeValue;
                let display = {
                    name: value.name,
                    type: value.type,
                    glyph: structure
                };
                tempURI.push(display);
            });
            URI.push(tempURI);
        });
        displayGlyphs = URI;
    }

}

function setList(data) {
    SBOL = data;
    return data;
}