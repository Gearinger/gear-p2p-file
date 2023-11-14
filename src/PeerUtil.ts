
import Peer, { DataConnection } from "peerjs";
function connectToPeerJS(peerId: string): Promise<Peer> {
    return new Promise((resolve, reject) => {
        const peer = new Peer(peerId);
        peer.on('open', () => resolve(peer));
        peer.on('error', reject);
    });
}

function connectToPeer(peer: Peer, peerId: string): Promise<DataConnection> {
    return new Promise((resolve, reject) => {
        const conn = peer.connect(peerId);
        conn.on('open', () => resolve(conn));
        conn.on('error', reject);
    });
}

export default { connectToPeerJS, connectToPeer }