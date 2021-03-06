/*******************************************************************************
 * NEAT
 * Michael Ruppe
 * May 2019
 *
 * This is a javascript class constructed according to:
 * Evolving Neural Networks through Augmenting Topologies -
 * Kenneth O. Stanley & Risto Miikkulainen. MIT Press Journals
 * http://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf
 *
 * Comments within the code may refer to specific figures or
 * equations from the paper.
 ******************************************************************************/

const PROBABILITY_PERTURBING = 0.9;
const IMPORTANCE_EXCESS = 0.5;
const IMPORTANCE_DISJOINT = 0.5;
const IMPORTANCE_WEIGHT = 0.5;

class Innovation {
  constructor() {
    this.current = 0;
  }

  generate() {
    return this.current++;
  }
}


class Genome {
  constructor() {
    // Each Genome includes a list of connection-genes,
    // where each item refers to two node-genes being connected. (See Figure 2)
    this.connections = [];
    this.nodes = [];
  }

  getConnectionGenes() {
    return this.connections;
  }

  getNodeGenes( type ) {
    // If type == 'INPUT' or 'HIDDEN' or 'OUTPUT' then return an array of those nodes only. Else, returns all nodes
    if ( type ) {
      let nodes = this.nodes.filter(obj => {
        return obj.type === type;
      });
      return nodes;
    }
    // else return all nodes
    return this.nodes;
  }

  addNodeGene(gene) {
    let index = gene.getID();
    this.nodes.splice(index, 0, gene);
  }

  addConnectionGene(gene) {
    this.connections.push(gene);
  }

  // Crossover assumes parentA is the most fit
  static crossover(parentA, parentB) {
    let child = new Genome();
    // Create child with same nodes as more-fit parent
    for (let Anode of parentA.getNodeGenes()){ // TODO: examine this loop - may not copy the right things
      child.addNodeGene(Anode.copy());
    }

    // Check every gene in A to see if it's present in B
    for (let Aconn of parentA.getConnectionGenes()){
      if (parentB.getConnectionGenes().includes(Aconn)) {
        // Found matching gene in A & B
        if (random() < 0.5) {
          let childConGene = Aconn.copy();
        } else {
          let childConGene = parentB.getConnectionGene.copy();
          childConGene.innovation = Aconn.getInnovation(); // Set the innovation to the (assumed) more-fit parent
          // This is the original line from the video. Not very clear... not sure
          // let childConGene = parent2.getConnectionGenes().get(parent1Node.getinnovation()).copy();
          child.addConnectionGene(childConGene);
        }

      } else {
        // Disjoint or excess gene - always included from more-fit parent
        child.addConnectionGene( Aconn.copy() );
      }
    }
    return child;
  }

  // Finds the compatability distance between two genomes. Equation (1)
  static compatabilityDistance(parentA, parentB) {
    let dif = Genome.difference(parentA, parentB);
    let E = dif.excess; // number of excess genes
    let D = dif.disjoint; // number of disjoint genes
    let W = Genome.averageWeightDifferences(parentA, parentB);
    let N = max(parentA.getConnectionGenes().length, parentB.getConnectionGenes().length); // number of genes in the larger genome
    if (N < 20) N = 1;

    return (IMPORTANCE_EXCESS * E + IMPORTANCE_DISJOINT * D)/N + (IMPORTANCE_WEIGHT * W);
  }

  static averageWeightDifferences(parentA, parentB) {
    let diff = 0;
    let n = 0;

    for (let conA of parentA.getConnectionGenes() ) {
      for (let conB of parentB.getConnectionGenes() ) {
        if (conA.getInnovation() == conB.getInnovation()){
          diff += abs(conA.getWeight() - conB.getWeight());
          n++;
          break;
        }
      }
    }

    return diff/n;
  }

  static difference(parentA, parentB) {
    // Return a count of how many disjoint and excess genes exist for two parents
    // Refer to Figure 4

    let disjoint = 0;
    let excess = 0;
    let maxA = parentA.getMaxInnovation();
    let maxB = parentB.getMaxInnovation();
    let end = Math.min(maxA, maxB);

    // Create an array of innovation IDs
    let arrA = parentA.getConnectionGenes().map(a => a.getInnovation());
    let arrB = parentB.getConnectionGenes().map(a => a.getInnovation());

    // Filter for genes that appear in ONLY one parent (Disjoint AND Excess genes)
    let diffA = arrA.filter(x => !arrB.includes(x));
    let diffB = arrB.filter(x => !arrA.includes(x));
    let diff = diffA.concat(diffB);

    // categorise gene-differences into Disjoint and Excess
    for (let gene of diff) {
      if (gene <= end) {
        disjoint++;
      } else {
        excess++;
      }
    }

    return {
      "disjoint" : disjoint,
      "excess" : excess
    };
  }

  getMaxInnovation() {
    let max = 0;
    for (let con of this.connections) {
      let inno = con.getInnovation();
      inno > max ? max = inno : max = max;
    }
    return max;
  }

  addConnectionMutation(innov) {
    // Select two unique nodes
    let node1 = new NodeGene( random(this.nodes) );
    let node2 = new NodeGene( random(this.nodes) );
    while (node2.getID() == node1.getID()){
      node2 = new NodeGene( random(this.nodes) );
    }

    // establish which node is 'upstream' of the other, assuming node1 is always upstream of node2
    let reversed = false;
    if (node1.getType() == "HIDDEN" && node2.getType() == "INPUT") {
      reversed = true;
    } else if (node1.getType() == "OUTPUT" && (node2.getType() == "INPUT" || node2.getType() == "HIDDEN") ) {
      reversed = true;
    }

    // Check if connection between selected nodes already exists
    let connectionExists = false;
    for (let con of this.connections) {
      if(
          ( con.getInNode() == node1.getID() && con.getOutNode() == node2.getID() ) ||
          ( con.getInNode() == node2.getID() && con.getOutNode() == node1.getID() )
        ){
          connectionExists = true;
          break;
        }
    }

    // Create the connection gene. If the connection already exists, attempt recursively
    if ( connectionExists ) {
      // For now, do nothing if connection already exists
      return;
      // this.addConnectionMutation();
    } else {
      this.connections.push(
        new ConnectionGene(
          reversed ? node2.getID() : node1.getID(),
          reversed ? node1.getID() : node2.getID(),
          random(-1,1),
          true,
          innov.generate())
        );
    }
  }

  addNodeMutation(innov) {
    // Select a random connection, deactivate and prepare for node insertion
    // let con = new ConnectionGene( random(this.connections) );
    let con = random(this.connections);
    con.disable();
    let inNodeID = con.getInNode();
    let outNodeID = con.getOutNode();

    // Create the new node and associated connections
    // inNode -> newNode -> outNode
    let newNode = new NodeGene("HIDDEN", this.nodes.length);
    let inToNew = new ConnectionGene(inNodeID, newNode.getID(), 1.0, true, innov.generate());
    let newToOut = new ConnectionGene(newNode.getID(), outNodeID, con.getWeight(), true, innov.generate());

    // Update genome lists
    this.nodes.push(newNode);
    this.connections.push(inToNew);
    this.connections.push(newToOut);

  }

  // Mutate connection weights (Section 4.1 Parameter Settings)
  mutation() {
    for (let con of this.connections) {
      if (random() < PROBABILITY_PERTURBING) {
        con.setWeight(con.getWeight() * random(-2,2)); // Multiply weight by a number -2 to 2
      } else {
        con.setWeight(random(-2,2)); // Assign a new random weight
      }
    }
  }

}
