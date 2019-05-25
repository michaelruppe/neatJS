function renderNetwork(genome) {
  let inputNodes = genome.getNodeGenes('INPUT');
  let outputNodes = genome.getNodeGenes('OUTPUT');
  let hiddenNodes = genome.getNodeGenes('HIDDEN');

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
}
