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

// TODO: Implement *GLOBAL* innovation number. IN should be unique for *every* structural innovation in the whole system of individual genomes

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
  crossover(parentA, parentB) {
    let child = new Genome();

    for (let Anode of parentA.getNodeGenes()){ // TODO: examine this loop - may not copy the right things
      child.addNodeGene(Anode.copy());
    }
    for (let Aconn of parentA.getConnectionGenes()){
      // Compare innovation numbers between parents, looking for matches to crossover
      if (parentB.getConnectionGenes().contains(Aconn)) {
        // TODO: things went pretty confusing at 14m15s

      }
    }

  }

  addConnectionMutation() {
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
          0)
        );
    }
  }

  addNodeMutation() {
    // Select a random connection, deactivate and prepare for node insertion
    // let con = new ConnectionGene( random(this.connections) );
    let con = random(this.connections);
    con.disable();
    let inNode = con.getInNode();
    let outNode = con.getOutNode();

    // Create the new node and associated connections
    let newNode = new NodeGene("HIDDEN", this.nodes.length);
    let inToNew = new ConnectionGene(inNode, newNode.getID(), 1.0, true, 0);
    let newToOut = new ConnectionGene(newNode.getID(), outNode, con.getWeight(), true, 0);

    // Update genome lists
    this.nodes.push(newNode);
    this.connections.push(inToNew);
    this.connections.push(newToOut);

  }

}
