// var java = require("java");
// java.classpath
// function Parser(){
//
// String output = SBOLIO.write(sboldata, "N-TRIPLES");
// SBOlDocument doc2 = SBOLIO.read(output, "N-TRIPLES");
//
// Sequence rbsSeq=(Sequence)sboldata.getIdentified(rbs.getSequences().get(0), Sequence.class);
// String nucleotides=rbsSeq.getElements();
//
// List<Component> components=(List<Component>)sboldata.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
// System.out.println("Graph query results:");
// for (Component component:components){
//     System.out.println("  " +  component.getDisplayId());
// }
// }



class sbolAPI {
constructor(data) {
    this.data = data;
}

set name(name){
    this._name = name.charAt(0).toUpperCase;
}
get name(){
    return this._name;
}

interactionList(){
    console.log(this.id + this.name);
}


}

const test = new sbolAPI();
test.name;
test.sbolData();