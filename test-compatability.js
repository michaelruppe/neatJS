let innovation;


function setup () {
  let canvas = createCanvas(500,500);
  canvas.parent('sketch-holder');
  background(127);


  // Build a test case: Figure 4 of the paper **********************************
  let genome1 = new Genome();
  let genome2 = new Genome();
  innovation = new Innovation();

  // CREATE PARENT 1
  // Add 3 input nodes, 1 output node
  for (let i = 0; i < 3; i++) {
    genome1.addNodeGene( new NodeGene('INPUT', i+1) );
  }
  genome1.addNodeGene( new NodeGene('OUTPUT', genome1.getNodeGenes().length+1) );
  genome1.addNodeGene( new NodeGene('HIDDEN', genome1.getNodeGenes().length+1) );
  genome1.addConnectionGene( new ConnectionGene(1, 4, random(-1,1), true, 1 ) );
  genome1.addConnectionGene( new ConnectionGene(2, 4, random(-1,1), false, 2 ) );
  genome1.addConnectionGene( new ConnectionGene(3, 4, random(-1,1), true, 3 ) );
  genome1.addConnectionGene( new ConnectionGene(2, 5, random(-1,1), true, 4 ) );
  genome1.addConnectionGene( new ConnectionGene(5, 4, random(-1,1), true, 5 ) );
  genome1.addConnectionGene( new ConnectionGene(1, 5, random(-1,1), true, 8 ) );

  // CREATE PARENT 2
  for (let i = 0; i < 3; i++) {
    genome2.addNodeGene( new NodeGene('INPUT', i+1) );
  }
  genome2.addNodeGene( new NodeGene('OUTPUT', genome2.getNodeGenes().length+1) );
  genome2.addNodeGene( new NodeGene('HIDDEN', genome2.getNodeGenes().length+1) );
  genome2.addNodeGene( new NodeGene('HIDDEN', genome2.getNodeGenes().length+1) );
  genome2.addConnectionGene( new ConnectionGene(1, 4, random(-1,1), true, 1 ) );
  genome2.addConnectionGene( new ConnectionGene(2, 4, random(-1,1), false, 2 ) );
  genome2.addConnectionGene( new ConnectionGene(3, 4, random(-1,1), true, 3 ) );
  genome2.addConnectionGene( new ConnectionGene(2, 5, random(-1,1), true, 4 ) );
  genome2.addConnectionGene( new ConnectionGene(5, 4, random(-1,1), false, 5 ) );
  genome2.addConnectionGene( new ConnectionGene(5, 6, random(-1,1), true, 6 ) );
  genome2.addConnectionGene( new ConnectionGene(6, 4, random(-1,1), true, 7 ) );
  genome2.addConnectionGene( new ConnectionGene(3, 5, random(-1,1), true, 9 ) );
  genome2.addConnectionGene( new ConnectionGene(1, 6, random(-1,1), true, 10 ) );


  let diff = Genome.difference(genome1, genome2);
  console.log("Difference: ", diff);

  let W = Genome.averageWeightDifferences(genome1, genome2);
  console.log("W", W);

  let distance = Genome.compatabilityDistance(genome1, genome2);
  console.log("Compatability Distance: ", distance);


  noLoop();
}
