//const index = require("./routes/index");
var java = require('java');
var mvn = require('node-java-maven');

//console.log(typeof index); // => 'function'


java.classpath.push('commons.io.jar');
java.classpath.push('src');

mvn(function(err, mvnResults) {
    if (err) {
      return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function(c) {
      console.log('adding ' + c + ' to classpath');
      console.log("\n");
      java.classpath.push(c);
    });
 });
  /*
  var javaInit = require('./javaInit');
  var java = javaInit.getJavaInstance();
  */
/*
var base = java.newInstance("java.net.URI");
if (java.instanceOf(base,"java.net.URI")){
console.log(" is an instance of ", base);
}

base.create("https://synbiohub.org/public/igem/");
var doc = new SBOLDocument(base);

List<Component> components=(List<Component>)doc.getIdentifieds("?identified a sbol:Component; sbol:role  SO:0000141; sbol:type SBO:0000251 .", Component.class);
System.out.println("Graph query results:");
for (Component component:components){
    System.out.println("  " +  component.getDisplayId());
}
*/


/*
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import org.sbolstandard.entity.Component;
import org.sbolstandard.entity.ComponentReference;
import org.sbolstandard.entity.Constraint;
import org.sbolstandard.entity.Feature;
import org.sbolstandard.entity.Identified;
import org.sbolstandard.entity.Interaction;
import org.sbolstandard.entity.Location;
import org.sbolstandard.entity.Participation;
import org.sbolstandard.entity.SBOLDocument;
import org.sbolstandard.entity.Sequence;
import org.sbolstandard.entity.SequenceFeature;
import org.sbolstandard.entity.SubComponent;
import org.sbolstandard.entity.Location.LocationBuilder;
import org.sbolstandard.util.SBOLGraphException;
import org.sbolstandard.vocabulary.ComponentType;
import org.sbolstandard.vocabulary.DataModel;
import org.sbolstandard.vocabulary.Encoding;
import org.sbolstandard.vocabulary.Orientation;
import org.sbolstandard.vocabulary.RestrictionType;
*/
//TODO: MODULE EXPORT FROM INDEX AND SEND DATA OF SBOL HERE TO BE PROCESSED


/*
java.classpath.push("java.util.List");
java.classpath.push("java.util.ArrayList");
java.classpath.push("java.util.Arrays");
java.classpath.push("java.util.Set");
java.classpath.push("org.sbolstandard.entity.Component");
java.classpath.push("org.sbolstandard.entity.Identified");
java.classpath.push("org.sbolstandard.entity.SBOLDocument");
java.classpath.push("java.net.URI");
*/




/*
java.classpath.push("src");
java.classpath.push("commons-lang3-3.1.jar");
java.classpath.push("commons-io.jar");

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
*/