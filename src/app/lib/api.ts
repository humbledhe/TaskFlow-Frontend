import "server-only";

const BACKEND_URL = process.env.TASKFLOW_BACKEND_BASE_URL;

if (!BACKEND_URL) {
    throw new Error("TASKFLOW_BACKEND_BASE_URL is undefined");
}

export { BACKEND_URL };
