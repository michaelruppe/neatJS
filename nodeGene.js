/*******************************************************************************
 * Stores the genetic information for a node within a Genome
 ******************************************************************************/

class NodeGene {

  constructor(type, id) {
    if( type instanceof NodeGene ) {
      // Copy EXISTING NodeGene with:  let newNodeGene = new NodeGene(oldNodeGene);
      this.type = type.type;
      this.id = type.id;
    } else {
      // Creating a NEW NodeGene
      this.type = type;
      this.id = id;
    }

  }

  getType() {
    return this.type;
  }

  getID() {
    return this.id;
  }

  copy() {
    return new NodeGene(this.type, this.id);
  }
}
