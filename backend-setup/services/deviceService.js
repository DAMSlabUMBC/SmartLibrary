let latestReading = null;
export const setLatestReading = ({topic,data }) =>{
    latestReading = {
        topic, 
        data,
        receivedAt: new Date().toISOString(),

    };
}
export const getLatestReading = () => latestReading;