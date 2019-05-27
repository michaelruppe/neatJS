function renderNetwork(genome) {
  const inputNodes = genome.getNodeGenes('INPUT');
  const outputNodes = genome.getNodeGenes('OUTPUT');
  const hiddenNodes = genome.getNodeGenes('HIDDEN');

  // =========== Nodes ===========
  const bound = width/2;
  const edge = width/6;
  const dispNodes = [];

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

  // Render nodes
  for (let node of dispNodes) {
    ellipse(node.x, node.y, 16,16);
    textAlign(CENTER, CENTER)
    text(node.node.id, node.x, node.y);
  }

  // =========== Connections ===========
  // Check all connections and render those that are expressed == true
  for (let con of genome.getConnectionGenes()) {
    if (con.expressed) {
      const p1 = con.inNode;
      const p2 = con.outNode;

      // find in, out nodes for this connection
      const inNode = dispNodes.filter(obj => {
        return obj.node.id === p1;
      });
      const outNode = dispNodes.filter(obj => {
        return obj.node.id === p2;
      });

      // Points at centre of each node
      const x1 = inNode[0].x;
      const y1 = inNode[0].y;
      const x2 = outNode[0].x;
      const y2 = outNode[0].y;

      // Don't draw full length, otherwise arrowheads crowd eachother.
      const x11 = x1 + 0.05 * (x2 - x1);
      const y11 = y1 + 0.05 * (y2 - y1);
      const x22 = x1 + 0.90 * (x2 - x1);
      const y22 = y1 + 0.90 * (y2 - y1);

      line(x11,y11,x22,y22);
      // this code is to make the arrow head
      const offset = 10; // Arrow-head size
      const angle = atan2(y1 - y2, x1 - x2); //gets the angle of the line
      noFill();
      push()
      translate(x22, y22); //translate to the destination vertex
      rotate(angle-HALF_PI); //rotates the arrow point
      triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
      pop();
    }
  }

}
