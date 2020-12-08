var java = require('java');
var mvn = require('node-java-maven');




mvn(function(err, mvnResults) {
    if (err) {
      return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function(c) {
     // console.log('adding ' + c + ' to classpath');
      java.classpath.push(c);
    });
  });

java.classpath.push("src");
java.classpath.push("java.util.List");
java.classpath.push("org.sbolstandard.entity.Component");
java.classpath.push("org.sbolstandard.entity.Identified");

var base = java.import("java.net.URI", URI.create("https://synbiohub.org/public/igem/"));
var doc = java.import("org.sbolstandard.entity.SBOLDocument", new SBOLDocument(base));

//List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
System.out.println("Graph query results:");
for (Component component:components){
    System.out.println("  " +  component.getDisplayId());
}



/*
var list1 = java.newInstanceSync("java.util.ArrayList");
 console.log(list1.sizeSync()); // 0
 list1.addSync('item1');
 console.log(list1.sizeSync()); // 1

 java.newInstance("java.util.ArrayList", function(err, list2) {
   list2.addSync("item1");
   list2.addSync("item2");
   console.log(list2.toStringSync()); // [item1, item2]
 });

var ArrayList = java.import('java.util.ArrayList');
 var list3 = new ArrayList();
list3.addSync('item1');
list3.equalsSync(list1); // true

//set base
   SBOLDocument doc=new SBOLDocument(base);
   String output=SBOLIO.write(doc, "JSON-LD");

   for (SubComponent subComp: device.getSubComponents()){
     System.out.println(subComp.getIsInstanceOf());
  }
*/
