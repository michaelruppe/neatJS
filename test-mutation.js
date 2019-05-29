let innovation;


function setup () {
  let canvas = createCanvas(500,500);

  canvas.parent('sketch-holder');
  background(127);


  let genome1 = new Genome();


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


  console.log(JSON.parse(JSON.stringify(genome1)));

  genome1.mutation();

  console.log(JSON.parse(JSON.stringify(genome1)));

  renderNetwork(genome1);


  noLoop();
}
