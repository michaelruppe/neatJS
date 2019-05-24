class ConnectionGene {
  constructor(inNode, outNode, weight, expressed, innovation) {
    if( inNode instanceof ConnectionGene ) {
      // Copy EXISTING ConnectionGene with:  let newGene = new ConnectionGene(oldGene);
      this.inNode = inNode.inNode;
      this.outNode = inNode.outNode;
      this.weight = inNode.weight;
      this.expressed = inNode.expressed;
      this.innovation = inNode.innovation;
    } else {
      // Create NEW ConnectionGene from input args
      this.inNode = inNode;
      this.outNode = outNode;
      this.weight = weight;
      this.expressed = expressed;
      this.innovation = innovation;
    }
  }

  getInNode() {
    return this.inNode;
  }

  getOutNode() {
    return this.outNode;
  }

  getWeight() {
    return this.weight;
  }

  getExpressed() {
    return this.expressed;
  }

  getInnovation() {
    return this.innovation;
  }

  enable() {
    this.expressed = true;
  }

  disable() {
    this.expressed = false;
  }

  copy() {
    return new ConnectionGene(this.inNode, this.outNode, this.weight, this.expressed, this.innovation);
  }
}
