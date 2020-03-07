export default function HistoryStateDeserializer(historyData, opts = {})
{
    return JSON.parse(historyData);
}
