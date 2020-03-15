# Importers & Exporters

They may seem straight-forward, but to maintain some properties, such as durability and error checking,
it can be a bit complex.

So, on a basic level, we want to save and load the working session from and to a text file at any point during the program. The reason for this requirement is because this allows us to re-use this system beyond just static file saving, but also for autosave, history, messaging, and a host of other services. Effectively, we are trying to build a general serializable/deserializable state system.

The most simple way to achieve these constraints listed so far, is to define 2 functions, a serializer and a paired deserializer. They will accept the current state of the system and output a string and vice versa. The current state of the system must be consistent and available wherever these functions could be called. To achieve this, the current state of the system must be linked to React's render cycle through a hook of some kind (with `useEffect()` if necessary). That way, any changes will cause the serializers to re-evaluate its inputs and maintain an updated system state.

To ensure the above, the "current state" of the system MUST NEVER ACCESSIBLE OUTSIDE OF REACT. That means access to these values should only be available as hooks or contexts. This way, transitively, the serializer can be safely used wherever it is possible to be used.

**...But how do we get the system state practically?**

Now, over time, there could be changes to the structure of the system state, requiring a change in the serializer. However, any changes could potentially be breaking changes for the save format. That means we need some sort of versioning guard to ensure compatibility. And these should always be included in the output.

File/Input => String => JSON Object => System State => JSON Object => String => File/Output

**...But how do we get the versioning practically?**

Let's consider an example:

System State:
- Graph Data
- Machine Data

Possible Exporters:
- Image Exporter (this is a special case and can be ignored)
- JFLAP Exporter
- SVG Exporter

Possible Importers:
- Old Flap.js Importers
- JFLAP Importer

If either the graph or machine format has breaking changes, then all serializers must be updated. Is there any way to counter this?
- We can have every importer and exporter operate on the serialized/deserialized data. That way the input format expected by all exporters is maintained.

For file downloading: System State => Serializer => Exporter => Downloader

Or

For history: System State => Serializer => System State


useGraphType()
useGraphState()

useSerializer({ graphType, graphState });



