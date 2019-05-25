let innovation;


function setup () {
  let canvas = createCanvas(500,500);
  canvas.parent('sketch-holder');
  background(127);


  // Build a test case: Figure 4 of the paper **********************************
  let genome1 = new Genome();
  let genome2 = new Genome();
  innovation = new Innovation();

  // PARENT 1
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

  // PARENT 2
  for (let i = 0; i < 3; i++) {
    genome2.addNodeGene( new NodeGene('INPUT', i+1) );
  }
  genome2.addNodeGene( new NodeGene('OUTPUT', genome1.getNodeGenes().length+1) );
  genome2.addNodeGene( new NodeGene('HIDDEN', genome1.getNodeGenes().length+1) );
  genome2.addNodeGene( new NodeGene('HIDDEN', genome1.getNodeGenes().length+1) );
  genome2.addConnectionGene( new ConnectionGene(1, 4, random(-1,1), true, 1 ) );
  genome2.addConnectionGene( new ConnectionGene(2, 4, random(-1,1), false, 2 ) );
  genome2.addConnectionGene( new ConnectionGene(3, 4, random(-1,1), true, 3 ) );
  genome2.addConnectionGene( new ConnectionGene(2, 5, random(-1,1), true, 4 ) );
  genome2.addConnectionGene( new ConnectionGene(5, 4, random(-1,1), false, 5 ) );
  genome2.addConnectionGene( new ConnectionGene(5, 6, random(-1,1), true, 6 ) );
  genome2.addConnectionGene( new ConnectionGene(6, 4, random(-1,1), true, 7 ) );
  genome2.addConnectionGene( new ConnectionGene(3, 5, random(-1,1), true, 9 ) );
  genome2.addConnectionGene( new ConnectionGene(1, 6, random(-1,1), true, 10 ) );

  // connect all inputs to all outputs
  // for (let inNode of inputNodes) {
  //   for (let outNode of outputNodes) {
  //     genome1.addConnectionGene(
  //       new ConnectionGene(inNode.getID(), outNode.getID(), random(-1,1), true, innovation.generate())
  //     );
  //   }
  // }



  // DRAW THE NETWORK **********************************************************
  let inputNodes = genome2.getNodeGenes('INPUT');
  let outputNodes = genome2.getNodeGenes('OUTPUT');
  let hiddenNodes = genome2.getNodeGenes('HIDDEN');

  // draw Input / Output nodes
  let bound = width/2;
  let edge = width/4;
  let dispNodes = [];

  // INPUT
  for (let i = 0; i < inputNodes.length; i++) {
    dispNodes.push({'node' : inputNodes[i], 'x':edge, 'y':(0.5+i)*height/inputNodes.length });
    ellipse(dispNodes[i].x, dispNodes[i].y, 16,16);
  }

  // OUTPUT
  let start = dispNodes.length;
  for (let i = 0; i < outputNodes.length; i++) {
    dispNodes.push({'node' : outputNodes[i], 'x':width-edge, 'y':(0.5+i)*height/outputNodes.length });
    ellipse(dispNodes[start+i].x, dispNodes[start+i].y, 16,16);
  }

  // HIDDEN
  start = dispNodes.length;
  for (let i = 0; i < hiddenNodes.length; i++) {
    // get the input and ouput connections

    dispNodes.push({'node' : hiddenNodes[i], 'x':width/2, 'y':(0.5+i)*height/hiddenNodes.length });
    ellipse(dispNodes[start+i].x, dispNodes[start+i].y, 16,16);
  }

  // // draw all connections
  //




  noLoop();
}
