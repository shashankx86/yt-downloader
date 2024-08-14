import 'dotenv/config' 
import { Job } from "bull";
import SocketClient from "./SocketClient";
import VideoService from "./VideoService";
import { WebSocketMessage, ProgressMessageType } from './types';
const processor =  async function(job: Job ): Promise<Object> {
    console.log('processor was called with data:', job.data);

    const {videoId, mp3Convert, clientId} = job.data;
    const convertor = new VideoService(clientId, videoId);

    try {

        // Dowload audio
        let downloadedAudio = await convertor.downloadAudio();

        // Inform client that download is completed
        const msg: WebSocketMessage = {
            clientId,
            msg: {
                percents: 100,
                completed: true,
                videoId: videoId,
                path: downloadedAudio.path.toString().replace('downloads/', '') 
            }
        }
        SocketClient.getClient()?.emit('dl-progress', msg)
        mp3Convert && await convertor.mp3Convert(
            downloadedAudio.source,
            String(downloadedAudio.source).replace(String(downloadedAudio.extension), 'mp3')
        );
        if (mp3Convert) {
            const convertedAudio = await convertor.mp3Convert(downloadedAudio.source);
        }

        return Promise.resolve({result:'job-completed', videoId});

    } catch (error) {
        console.log('Jon error:', error);
        return Promise.reject(error);
    }
}

export default processor;
