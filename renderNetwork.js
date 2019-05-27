function renderNetwork(genome) {
  let inputNodes = genome.getNodeGenes('INPUT');
  let outputNodes = genome.getNodeGenes('OUTPUT');
  let hiddenNodes = genome.getNodeGenes('HIDDEN');

  // =========== Nodes ===========
  let bound = width/2;
  let edge = width/6;
  let dispNodes = [];

  // INPUT
  for (let i = 0; i < inputNodes.length; i++) {
    dispNodes.push({'node' : inputNodes[i], 'x':edge, 'y':(0.5+i)*height/inputNodes.length });
  }

  // OUTPUT
  let start = dispNodes.length;
  for (let i = 0; i < outputNodes.length; i++) {
    dispNodes.push({'node' : outputNodes[i], 'x':width-edge, 'y':(0.5+i)*height/outputNodes.length });
  }

  // HIDDEN
  start = dispNodes.length;
  for (let i = 0; i < hiddenNodes.length; i++) {
    dispNodes.push({'node' : hiddenNodes[i], 'x':random(width/3, 2*width/3), 'y':(0.5+i)*height/hiddenNodes.length });
  }

  console.log(dispNodes);

  // NODES
  for (let node of dispNodes) {
    ellipse(node.x, node.y, 16,16);
    textAlign(CENTER, CENTER)
    text(node.node.id, node.x, node.y);
  }

  // =========== Connections ===========
  for (let con of genome.getConnectionGenes()) {
    if (con.expressed) {
      let p1 = con.inNode;
      let p2 = con.outNode;

      // find in, out nodes for this connection
      let inNode = dispNodes.filter(obj => {
        return obj.node.id === p1;
      });
      let outNode = dispNodes.filter(obj => {
        return obj.node.id === p2;
      });

      // render the connection
      let x1 = inNode[0].x;
      let y1 = inNode[0].y;
      let x2 = outNode[0].x;
      let y2 = outNode[0].y;
      var angle = atan2(y1 - y2, x1 - x2); //gets the angle of the line


      line(x1,y1,x2,y2);
      // this code is to make the arrow point
      let offset = 10;
      noFill();
      push() //start new drawing state
      translate(x2, y2); //translates to the destination vertex
      rotate(angle-HALF_PI); //rotates the arrow point
      triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
      pop();
    }
  }

}
