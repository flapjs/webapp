import NodalGraph from './NodalGraph.js';

class GraphUploader
{
  static uploadFileToGraph(fileBlob, graph, callback=null, errorCallback=null)
  {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      try
      {
        const dataJSON = JSON.parse(data);
        const dst = NodalGraph.parseJSON(dataJSON);
        graph.copyGraph(dst);

        if (callback) callback();
      }
      catch(e)
      {
        reader.abort();

        if (errorCallback) errorCallback();
      }
    };
    reader.onerror = (event) => {
      if (errorCallback) errorCallback(event.target.error.code);
    };
    reader.readAsText(fileBlob);
  }

  static uploadJFFToGraph(fileBlob, graph, callback=null, errorCallback=null)
  {
    //TODO: Parse JSON
    alert("Sorry, not yet implemented :)");
  }
}

export default GraphUploader;