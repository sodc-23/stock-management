<?php
namespace App\Http\Controllers;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Ratchet\Wamp\WampServerInterface;

class SocketController implements WampServerInterface
{
    /**
     * A lookup of all the topics clients have subscribed to
     */
    protected $subscribedTopics = array();

    public function onSubscribe(ConnectionInterface $conn, $topic) {
        echo"on";
        $this->subscribedTopics[$topic->getId()] = $topic;
    }

    /**
     * @param string JSON'ified string we'll receive from ZeroMQ
     */
    public function onBlogEntry($entry) {
        $entryData = json_decode($entry, true);

        // If the lookup topic object isn't set there is no one to publish to
        if (!array_key_exists($entryData['category'], $this->subscribedTopics)) {
            return;
        }

        $topic = $this->subscribedTopics[$entryData['category']];

        // re-send the data to all the clients subscribed to that category
        $topic->broadcast($entryData);

        echo "A new topic has been push";
    }


    public function onUnSubscribe(ConnectionInterface $conn, $topic) {
        echo "A client has subscribed ".$conn->resourceId."\n";
    }

    
    public function onOpen(ConnectionInterface $conn) {
        echo "A client is connected ".$conn->resourceId."\n";

    }
    public function onClose(ConnectionInterface $conn) {
        echo "A client has been disconnected ".$conn->resourceId."\n";
    }

    /* The rest of our methods were as they were, omitted from docs to save space */
    /**
     * If there is an error with one of the sockets, or somewhere in the application where an Exception is thrown,
     * the Exception is sent back down the stack, handled by the Server and bubbled back up the application through this method
     * @param  ConnectionInterface $conn
     * @param  \Exception $e
     * @throws \Exception
     */
    function onError(ConnectionInterface $conn, \Exception $e)
    {
        // TODO: Implement onError() method.
    }

    /**
     * An RPC call has been received
     * @param \Ratchet\ConnectionInterface $conn
     * @param string $id The unique ID of the RPC, required to respond to
     * @param string|Topic $topic The topic to execute the call against
     * @param array $params Call parameters received from the client
     */
    function onCall(ConnectionInterface $conn, $id, $topic, array $params)
    {
        // TODO: Implement onCall() method.
    }

    /**
     * A client is attempting to publish content to a subscribed connections on a URI
     * @param \Ratchet\ConnectionInterface $conn
     * @param string|Topic $topic The topic the user has attempted to publish to
     * @param string $event Payload of the publish
     * @param array $exclude A list of session IDs the message should be excluded from (blacklist)
     * @param array $eligible A list of session Ids the message should be send to (whitelist)
     */
    function onPublish(ConnectionInterface $conn, $topic, $event, array $exclude, array $eligible)
    {
        // TODO: Implement onPublish() method.
    }
}