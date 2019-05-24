function setup () {
  // let canvas = createCanvas(500,500);
  // canvas.parent('sketch-holder');
  // background(127);

  let innovationNumber = 0;

  // Build a test case: Figure 2 of the paper **********************************
  let genome1 = new Genome();

  // Add 3 input nodes, 1 output node
  for (let i = 0; i < 3; i++) {
    genome1.addNodeGene( new NodeGene('INPUT', i) );
  }
  genome1.addNodeGene( new NodeGene('OUTPUT', genome1.getNodeGenes().length) );
  // genome1.addNodeGene( new NodeGene('OUTPUT', genome1.getNodeGenes().length) );

  let inputNodes = genome1.getNodeGenes('INPUT');

  let outputNodes = genome1.getNodeGenes('OUTPUT');

  // connect all inputs to all outputs
  for (let inNode of inputNodes) {
    for (let outNode of outputNodes) {
      genome1.addConnectionGene(
        new ConnectionGene(inNode.getID(), outNode.getID(), random(-1,1), true, innovationNumber++)
      );
    }
  }

  // add a node mutation
  genome1.addNodeMutation();
  genome1.addConnectionMutation();

  // enumerate hidden nodes
  let hiddenNodes = genome1.nodes.filter(obj => {
    return obj.type === 'HIDDEN'
  });

  console.log(genome1);

  // DRAW THE NETWORK **********************************************************

  // // draw Input / Output nodes
  // let bound = width/2;
  // let edge = width/3;
  // let dispNodes = [];
  //
  // // INPUT
  // for (let i = 0; i < inputNodes.length; i++) {
  //   dispNodes.push({'node' : inputNodes[i], 'x':edge, 'y':(0.5+i)*height/inputNodes.length });
  //   ellipse(dispNodes[i].x, dispNodes[i].y, 16,16);
  // }
  //
  // // OUTPUT
  // let start = dispNodes.length;
  // for (let i = 0; i < outputNodes.length; i++) {
  //   dispNodes.push({'node' : outputNodes[i], 'x':width-edge, 'y':(0.5+i)*height/outputNodes.length });
  //   ellipse(dispNodes[start+i].x, dispNodes[start+i].y, 16,16);
  // }
  //
  // // HIDDEN
  // start = dispNodes.length;
  // for (let i = 0; i < hiddenNodes.length; i++) {
  //   // get the input and ouput connections
  //
  //   dispNodes.push({'node' : hiddenNodes[i], 'x':width/2, 'y':(0.5+i)*height/hiddenNodes.length });
  //   ellipse(dispNodes[start+i].x, dispNodes[start+i].y, 16,16);
  // }
  //
  // // draw all connections
  //




  noLoop();
}
