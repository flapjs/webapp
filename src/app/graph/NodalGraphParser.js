import Config from 'config.js';

import NodalGraph from './NodalGraph.js';
import Node from './Node.js';
import Edge from './Edge.js';

import { CURRENT_VERSION_STRING } from 'util/FlapSaver.js';

const EDGE_SYMBOL_SEPARATOR = ",";

class NodalGraphParser
{
  static parseJSON(data, dst=null)
  {
    const nodeLength = data.nodeCount;
    const edgeLength = data.edgeCount;

    if (nodeLength < 0) throw new Error("Invalid graph data: negative number of nodes.");
    if (edgeLength < 0) throw new Error("Invalid graph data: negative number of edges.");

    if (dst) dst.deleteAll();
    const result = dst || new NodalGraph(new Array(nodeLength), new Array(edgeLength));

    //The initial node is always saved/loaded first!
    for(let i = 0; i < nodeLength; ++i)
    {
      const nodeData = data.nodes[i];
      const newNode = new Node(result, nodeData.x || 0, nodeData.y || 0, nodeData.label || "q?");
      newNode.setGraphElementID(nodeData.id);
      newNode.accept = nodeData.accept;
      if (nodeData.customLabel)
      {
        newNode.setCustomLabel(newNode.getNodeLabel());
      }
      result.nodes[i] = newNode;
    }

    for(let i = 0; i < edgeLength; ++i)
    {
      const edgeData = data.edges[i];

      if (edgeData.from >= nodeLength || edgeData.from < 0) throw new Error("Invalid edge from data: node index \'" + edgeData.from + "\' out of bounds.");

      const newEdge = new Edge(result, result.nodes[edgeData.from], edgeData.to < 0 ? null : result.nodes[edgeData.to], edgeData.label || "0");
      newEdge.setGraphElementID(edgeData.id);

      //Force copy all quadratic data
      newEdge.setQuadratic(edgeData.quad.radians, edgeData.quad.length);
      result.edges[i] = newEdge;
    }

    return result;
  }

  static parseXML(data, dst=null)
  {
    let nodeList = data.getElementsByTagName("state");
    let edgeList = data.getElementsByTagName("transition");
    const nodeLength = nodeList.length;
    const edgeLength = edgeList.length;

    if (nodeLength < 0) throw new Error("Invalid graph data: negative number of nodes.");
    if (edgeLength < 0) throw new Error("Invalid graph data: negative number of edges.");

    if (dst) dst.deleteAll();
    //HACK: call newEdge to auto layout the graph, therefore a fixed length array cannot be allocated.
    const result = dst || new NodalGraph(new Array(nodeLength), []);
    let nodeIDMap = new Map();
    let startNodeID;
    //create nodes list
    for(let i = 0; i < nodeLength; ++i)
    {
      let node = nodeList[i];
      let nodeLabel = node.attributes[1].nodeValue;
      let nodeID = node.attributes[0].nodeValue;
      let nodeX = parseFloat(node.childNodes[1].childNodes[0].nodeValue);
      let nodeY = parseFloat(node.childNodes[3].childNodes[0].nodeValue);
      let nodeAccept = node.getElementsByTagName("final");
      let nodeStart = node.getElementsByTagName("initial");
      if(nodeStart && nodeStart.length > 0) startNodeID = nodeID;//TODO: allow JFLAP names to be id
      let newNode = new Node(result, nodeX , nodeY , Config.STR_STATE_LABEL + (nodeID));
      newNode.accept = (nodeAccept != null && nodeAccept.length > 0);
      if(nodeStart && nodeStart.length > 0)
      {
        if(result.nodes[0])
        {
          result.nodes[i] = result.nodes[0];
          nodeIDMap.set(nodeList[0].attributes[0].nodeValue, i);
          result.nodes[0] = newNode;
          nodeIDMap.set(nodeID, 0);
        }
        else
        {
          result.nodes[0] = newNode;
          nodeIDMap.set(nodeID, 0);
        }
      }
      result.nodes[i] = newNode;
      nodeIDMap.set(nodeID, i);
    }
    const boundingRect = result.getBoundingRect();
    const width = boundingRect.width;
    const height = boundingRect.height;
    for(var i = 0; i < result.nodes.length; i++)
    {
      result.nodes[i].x -= boundingRect.minX + width / 2;
      result.nodes[i].y -= boundingRect.minY + height / 2;
      //result.nodes[i].x = parseFloat(result.nodes[i].x) + width/2;
      //result.nodes[i].y = -height/2 - parseFloat(result.nodes[i].y);
    }

    //create edge lists
    for(let i = 0; i < edgeLength; ++i)
    {
      const edge = edgeList[i];
      const edgeFrom = edge.childNodes[1].childNodes[0].nodeValue;
      const edgeTo = edge.childNodes[3].childNodes[0].nodeValue;
      let edgeLabel = edge.childNodes[5];
      if(edgeLabel.childNodes[0]) edgeLabel = edgeLabel.childNodes[0].nodeValue;
      else edgeLabel = EMPTY;
      const indexOfEdgeFrom = nodeIDMap.get(edgeFrom);
      const indexOfEdgeTo = nodeIDMap.get(edgeTo);

      //check valid from and to node
      if(result.nodes[indexOfEdgeFrom] || (startNodeID == edgeFrom && result.nodes[0]) || (edgeFrom == 0 && result.nodes[startNodeID]) )
      {
        const newEdge = result.newEdge(result.nodes[indexOfEdgeFrom], edgeTo < 0 ? null : result.nodes[indexOfEdgeTo], edgeLabel || "0");
        const formattedEdge = result.formatEdge(newEdge);
        if (newEdge != formattedEdge) result.deleteEdge(newEdge);
      }
      else
      {
         throw new Error("Invalid edge from data: node index \'" + edge.from + "\' out of bounds.");
      }
    }
    return result;
  }

  static toJSON(graph)
  {
    const nodeLength = graph.nodes.length;
    const edgeLength = graph.edges.length;

    const data = {
      nodeCount: nodeLength,
      nodes: new Array(nodeLength),
      edgeCount: edgeLength,
      edges: new Array(edgeLength)
    };

    for(let i = 0; i < nodeLength; ++i)
    {
      const node = graph.nodes[i];
      data.nodes[i] = {
        id: node.getGraphElementID(),
        x: node.x,
        y: node.y,
        label: node.getNodeLabel(),
        accept: node.accept,
        customLabel: node.hasCustomLabel()
      };
    }

    for(let i = 0; i < edgeLength; ++i)
    {
      const edge = graph.edges[i];
      const edgeQuad = edge.getQuadratic();
      data.edges[i] = {
        id: edge.getGraphElementID(),
        from: graph.nodes.indexOf(edge.getSourceNode()),
        to: graph.nodes.indexOf(edge.getDestinationNode()),
        quad: { radians: edgeQuad.radians, length: edgeQuad.length },
        label: edge.getEdgeLabel()
      };
    }

    return data;
  }

  static toXML(graph)
  {
    const header = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?><!--Created with flap.js " + CURRENT_VERSION_STRING + "--><structure></structure>";
    let parser = new DOMParser();
    const doc = parser.parseFromString(header, "application/xml");

    const structure = doc.getElementsByTagName("structure")[0];

    const type = doc.createElement("type");
    type.innerHTML = "fa";//For FSA
    structure.appendChild(type);

    const automaton = doc.createElement("automaton");
    structure.appendChild(automaton);

    let node, state, x, y;
    for(let i = 0; i < graph.nodes.length; ++i)
    {
      node = graph.nodes[i];

      //state tag
      state = doc.createElement("state");
      state.id = "" + i;
      state.setAttribute("name", node.getNodeLabel());
      automaton.appendChild(state);

      //x tag
      x = doc.createElement("x");
      x.innerHTML = node.x;
      state.appendChild(x);

      //y tag
      y = doc.createElement("y");
      y.innerHTML = node.y;
      state.appendChild(y);

      //initial tag
      if (i == 0)
      {
        state.appendChild(doc.createElement("initial"));
      }

      //final tag
      if (node.accept)
      {
        state.appendChild(doc.createElement("final"));
      }
    }

    let transition, from, to, read, symbols;
    for(let edge of graph.edges)
    {
      symbols = edge.getEdgeLabel().split(EDGE_SYMBOL_SEPARATOR);
      for(let symbol of symbols)
      {
        //transition tag
        transition = doc.createElement("transition");
        automaton.appendChild(transition);

        //from tag
        from = doc.createElement("from");
        from.innerHTML = graph.nodes.indexOf(edge.getSourceNode());
        transition.appendChild(from);

        //to tag
        to = doc.createElement("to");
        to.innerHTML = graph.nodes.indexOf(edge.getDestinationNode());
        transition.appendChild(to);

        //read tag
        read = doc.createElement("read");
        read.innerHTML = symbol;
        transition.appendChild(read);
      }
    }

    return doc;
  }
}

export default NodalGraphParser;