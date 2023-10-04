import os from "os";
import { ServiceAPIResponse } from "../../types/service-response";

const timeElapsed = Date.now();
const today = new Date(timeElapsed);

const formatTime = (seconds: number) => {
  function pad(s: number) {
    return (s < 10 ? "0" : "") + s;
  }
  let hours = Math.floor(seconds / (60 * 60));
  let minutes = Math.floor((seconds % (60 * 60)) / 60);
  let secs = Math.floor(seconds % 60);

  return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
};

const getSimple = async (): Promise<ServiceAPIResponse<Object>> => {
  /* fetch data here */
  return {
    statusCode: 200,
    body: { success: true, message: "🛠️ API v1 working!" },
  };
};

const getDetailed = async (
  clientIP: string
): Promise<ServiceAPIResponse<Object>> => {
  /* fetch data here */
  const healthcheckData: Object = {
    message: "🛠️ API v1 working!",
    serverUptime: formatTime(process.uptime()),
    osUptime: formatTime(os.uptime()),
    timestamp: today.toUTCString(),
    cpus: os.cpus(),
    architecture: os.arch(),
    networkInterfaces: os.networkInterfaces(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    platform: os.platform(),
    osType: os.type(),
    osRelease: os.release(),
    osVersion: os.version(),
    hostname: os.hostname(),
    userInfo: os.userInfo(),
    reqIP: clientIP,
    //If your public ip shows up that means trust-proxy is correct in express server configuration
  };
  return {
    statusCode: 200,
    body: {
      success: true,
      message: "🛠️ API v1 working!",
      data: healthcheckData,
    },
  };
};

export { getSimple, getDetailed };
