// PREFIX bd: <http://www.bigdata.com/rdf#>
// PREFIX bd: <http://www.bigdata.com/rdf#>
// PREFIX dc: <http://purl.org/dc/elements/1.1/>
// PREFIX dbo: <http://dbpedia.org/ontology/>
// PREFIX db: <http://dbpedia.org/>
// PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
// PREFIX owl: <http://www.w3.org/2002/07/owl#>
// PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
// PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
// PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
// PREFIX wdt: <http://www.wikidata.org/prop/direct/>
// PREFIX wd: <http://www.wikidata.org/entity/>
// PREFIX wikibase: <http://wikiba.se/ontology#>
// PREFIX p: <http://www.wikidata.org/prop/>
// PREFIX ps: <http://www.wikidata.org/prop/statement/>
// PREFIX : <http://localhost:3333/>

// SELECT ?dob ?auth ?authLabel WHERE {

// 	SERVICE <https://query.wikidata.org/sparql> {
//     	SELECT ?auth ?authLabel ?dob WHERE {
//            ?auth wdt:P106 wd:Q36180 .
//       		?auth wdt:P6886 wd:Q150 .
//       		?auth wdt:P569 ?dob .
      
//            SERVICE wikibase:label {
//             bd:serviceParam wikibase:language "en" .
//            }
//          }
      
//     HAVING (?dob < 1800)
//     LIMIT 25
//   }

// }




const endpoint = "http://127.0.0.1:3030/openedition/query"

function renderall(){
    renderbarchartauth(10)
}

function renderbarchartauth(nb_authors) {
    var sparql = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX dbo:   <http://dbpedia.org/ontology/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX : <http://localhost:3333/>

    SELECT ?t (COUNT(?p) as ?pCount) WHERE {
    ?b a dbo:Book.
    ?b dc:title ?t.
    ?b :has_bibliographical_information ?bb.
    ?bb :has_authors ?p.
    }
    GROUP BY ?t
    HAVING (?pCount>${nb_authors})
    ORDER BY DESC(?pCount)
    `
    

    d3sparql.query(endpoint, sparql, (render) => {

        var config = {
        "label_x":  "Title",        // label for x-axis (optional; default is same as var_x)
        "label_y":  "Authors",      // label for y-axis (optional; default is same as var_y)
        "var_x":    "t",            // SPARQL variable name for x-axis (optional; default is the 1st variable)
        "var_y":    "pCount",       // SPARQL variable name for y-axis (optional; default is the 2nd variable)
        "width":    850,            // canvas width (optional)
        "height":   300,            // canvas height (optional)
        "margin":   40,             // canvas margin (optional)
        "selector": "#result"
        }
        d3sparql.barchart(render, config)
    })
}